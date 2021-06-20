import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Subject} from 'rxjs';
import * as moment from 'moment';
import {ClientsService} from '../../services/clients.service';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {

  isAlive$ = new Subject();

  currentYear = parseInt(`${moment().format('YYYY')}`, 10);
  lastOneYear = `${this.currentYear - 1}-${this.currentYear}`;

  documentsByType: {[type: string]: any[]} = {};
  documents$ = new BehaviorSubject<any[]>([]);
  docsLoaded = false;

  fileToMap = {
    folder: [
      {
        file: 'https://hma-docs.s3.ap-south-1.amazonaws.com/6646b710-4e27-4728-9053-1d2103d3704f.pdf',
        preview: 'https://hma-docs.s3.ap-south-1.amazonaws.com/7af73066-3818-4866-bb56-ae475b59fcb0.png'
      }
    ],
    status: 'COMPLETED'
  };
  fileMapped = false;

  constructor(private router: Router, private route: ActivatedRoute, private clientsService: ClientsService) {
    route.params.subscribe(res => {
      this.clientsService.loadClientDocuments(res?.companyId, this.lastOneYear)
        .subscribe(val => {
        this.documents$.next(val?.records);
        this.docsLoaded = true;
        this.categoriseDocuments(val?.records);
      });
    });
  }

  ngOnInit(): void {
  }

  categoriseDocuments(docsArr): void {
    docsArr.forEach(doc => {
      if (this.documentsByType.hasOwnProperty(doc?.type)) {
        this.documentsByType?.[doc?.type].push(doc);
      } else {
        this.documentsByType[doc?.type] = [doc];
      }
    });
  }

  onGoBack(): void {
    this.router.navigate(['../'], {relativeTo:  this.route}).then();
  }

  async mapFileToThisFolder(document): Promise<any> {
    const {_id: documentId} = document;
    const fileMapResponse = await this.clientsService.mapFileToDocument(documentId, this.fileToMap)
      .pipe(take(1), takeUntil(this.isAlive$)).toPromise();
    if (fileMapResponse?.message === SUCCESSFULLY_UPDATED) {
      this.fileMapped = true;
      alert(SUCCESSFULLY_UPDATED);
    }
  }

  ngOnDestroy(): void {
    this.isAlive$.next(false);
    this.isAlive$.complete();
  }

}

export const SUCCESSFULLY_UPDATED = 'Successfully Updated';
