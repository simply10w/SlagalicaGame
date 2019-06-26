import { Observable, Observer } from 'rxjs';

export function readBlob(file: File): Observable<string> {
  return new Observable((observer: Observer<string>) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      observer.next(reader.result.toString());
      observer.complete();
    };
    reader.onerror = () => observer.error('Failed to parse the file.');
  });
}
