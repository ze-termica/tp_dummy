import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private afs: AngularFirestore) { }

  delData(collection: string, id: string) {
    //console.log('deData: ', collection);
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(collection).doc(id).delete().then(res => resolve(res), err => reject(err));
    });
  }

  setData(collection: string, id: string, object: any) {
    //console.log('setData: ', collection);
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(collection).doc(id).set(Object.assign({}, object)).then(res => resolve(res), err => reject(err));
    });
  }

  updateData(collection: string, id: string, object: any) {
    //console.log('updateData: ', collection);
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(collection).doc(id).update(Object.assign({}, object)).then(res => resolve(res), err => reject(err));
    });
  }

  setDataWithoutId(collection: string, object: any) {
    //console.log('setDataWithoutId: ', collection);
    return new Promise<any>((resolve, reject) => {
      let ref = this.afs.collection(collection).ref.doc();
      object.id = ref.id;
      ref.set(Object.assign({}, object)).then(() => resolve(ref), err => reject(err));
    });
  }

  getData(collection: string, field: string, operator: any, value: string) {
    //console.log('getData: ', collection);
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(collection).ref.where(field, operator, value).get().then(resp => {
        resolve(resp);
      }, err => reject(err));
    });
  }

  getDataById(collection: string, key: string) {
    //console.log('getDataById: ', collection);
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(collection).doc(key).ref.get().then(resp => resolve(resp), err => reject(err));
    });
  }

  listenDataById(collection: string, key: string) {
    return this.afs.collection(collection).doc(key).snapshotChanges();
  }  

  getDataActive(collection: string, field: string, operator: any, value: string) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(collection).ref.where(field, operator, value).where('is_active', '==', true).get().then(resp => resolve(resp), err => reject(err));
    });
  }

  removeDataById(collection: string, key: string) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(collection).doc(key).delete().then(res => resolve(res), err => reject(err));
    });
  }

  getCollection(collection: string) {
    //console.log('getCollection ', collection);
    return new Promise<any>((resolve, reject) => {
      this.afs.collection(collection).ref.get().then(resp => resolve(resp), err => reject(err));
    });
  }
}
