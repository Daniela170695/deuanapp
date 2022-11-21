import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'; 
import { take } from 'rxjs/operators';
import { Department } from '../../interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private departmentDoc: AngularFirestoreDocument<Department>;
  private department: Promise<Department>;

  constructor(private afs: AngularFirestore) { }

  getOne(id:string){
    this.departmentDoc = this.afs.doc<Department>('Department/'+id);
    this.department = this.departmentDoc.valueChanges({idField: 'id'}).pipe(take(1)).toPromise();
    return this.department;
  }

}
