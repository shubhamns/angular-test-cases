import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { DeleteUserComponent } from './../delete-user/delete-user.component';

@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.scss'],
})
export class ReadUserComponent implements OnInit {
  isLoading = true;
  displayedColumns: string[] = [
    'sno',
    'name',
    'email',
    'createdAt',
    'updatedAt',
    'update',
    'delete',
  ];
  dataSource!: MatTableDataSource<User>;

  result: any = [];

  arrayObj = [
    {
      itemHistoryId: 5,
      itemId: 96,
      categoryId: null,
      drugCategory: null,
      manufId: null,
      createByHistory: 'Z232590',
      createDtHistory: 1639002363000,
      createProcessHistory: 'SPOMS_ADD',
      updateByHistory: null,
      updateDtHistory: null,
      updateProcessHistory: null,
      createBy: 'Z232590',
      createDt: 1639002363000,
      createProcess: 'SPOMS_ADD',
      updateBy: null,
      updateDt: 1639715122000,
      updateProcess: 'SPOMS_UPDATE',
      name: 'GEETA TEST',
      formTxt: 'GT',
      sigDef: null,
      narcCd: null,
      drugSupplyInd: null,
      sigReqInd: null,
      metQty: 0,
      unitsQty: null,
      strength: null,
      ndcCd5: null,
      ndcCd4: null,
      ndcCd2: null,
      genericInd: 'N',
      inactiveInd: 'N',
      iceInd: null,
      gpiClass: null,
      categoryCode: 'P',
      ltdDistribution: null,
      ele340bStartDt: '',
      ele340bEndDt: '',
      sourceID: '767',
      systemID: 'HBS',
      cptCd: null,
      unitPkgCd: null,
      awpMarkupFactor: 0,
      frozenAwpAmt: 0,
      genSub: null,
      kdcCd: null,
      printMg: null,
      ndc: null,
    },
    {
      itemHistoryId: 2000110,
      itemId: 96,
      categoryId: null,
      drugCategory: null,
      manufId: null,
      createByHistory: 'Z311999',
      createDtHistory: 1641227673000,
      createProcessHistory: 'ITEMS_UPDATE',
      updateByHistory: null,
      updateDtHistory: null,
      updateProcessHistory: null,
      createBy: 'Z232590',
      createDt: 1639002363000,
      createProcess: 'SPOMS_ADD',
      updateBy: 'Z311999',
      updateDt: 1641227672000,
      updateProcess: 'SPOMS_UPDATE',
      name: 'GEETA TEST',
      formTxt: 'MT',
      sigDef: null,
      narcCd: null,
      drugSupplyInd: null,
      sigReqInd: null,
      metQty: 0,
      unitsQty: null,
      strength: 'YYYT',
      ndcCd5: '55555',
      ndcCd4: '5555',
      ndcCd2: '55',
      genericInd: 'N',
      inactiveInd: 'Y',
      iceInd: null,
      gpiClass: 'UUJ',
      categoryCode: 'P',
      ltdDistribution: null,
      ele340bStartDt: '',
      ele340bEndDt: '',
      sourceID: '767',
      systemID: 'HBS',
      unitPkgCd: null,
      awpMarkupFactor: 0,
      frozenAwpAmt: 0,
      genSub: null,
      kdcCd: null,
      printMg: null,
      ndc: null,
    },
  ];

  constructor(public dialog: MatDialog, private userService: UserService) {}

  getObjName(value: string) {
    let res = '';
    if (value === 'Y') {
      res = 'Yes';
    } else if (value === 'N') {
      res = 'No';
    }
    return res;
  }

  compareValue(index: number, _array: any, key: string, isKey: string = '') {
    let res = {};
    if (_array[index][key] !== _array[index + 1]?.[key]) {
      res = {
        before: this.getObjName(_array[index + 1]?.[key]) || 'None',
        after: this.getObjName(_array[index][key]),
      };
    }
    return res;
  }

  getSummery(index: number, _array: any) {
    let res = [];
    res.push(
      {
        attribute: 'Product Name',
        ...this.compareValue(index, _array, 'name'),
      },
      {
        attribute: 'FormTxt',
        ...this.compareValue(index, _array, 'formTxt'),
      },
      {
        attribute: 'Strength',
        ...this.compareValue(index, _array, 'strength'),
      },
      {
        attribute: 'inactiveInd',
        ...this.compareValue(index, _array, 'inactiveInd', 'inactiveInd'),
      }
    );
    return res;
  }

  ngOnInit(): void {
    this.loadUser();

    this.arrayObj.forEach((element, index, array) => {
      let obj = {
        userID: '',
        userName: '',
        itemId: element.itemId,
        name: element.name,
        formTxt: element.formTxt,
        strength: element.strength,
        ndc: element.ndc,
        updateTime: element.updateDt,
        actiontaken: element.updateProcess,
        changeSummary: this.getSummery(index, array),
      };
      this.result.push(obj);
    });
    console.log(this.result);
  }

  loadUser() {
    this.userService.getUsers().subscribe(
      (data: any) => {
        // console.log('users=>>', data);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(data.results);
        // console.log(this.dataSource);
      },
      (error: any) => {
        this.isLoading = false;
        // console.log('error=>>', error);
      }
    );
  }

  deleteUser(_id: string) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '300px',
      data: _id,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.dataSource.data = this.dataSource.data.filter(
          (user) => user._id !== _id
        );
      }
    });
  }
}
