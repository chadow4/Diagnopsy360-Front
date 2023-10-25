import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import {HttpClient} from "@angular/common/http";
import {MessageDto, MessageSocketDto} from "../models/message.model";

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private socket: Socket;
  private readonly apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.socket = io(this.apiUrl);
  }

  public sendMessage(message: MessageSocketDto): void {
    this.socket.emit('message', message);
  }

  public getMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    });
  }

  public joinChat(userId: number): void {
    this.socket.emit('join', userId);
  }

  public getMessageByDiagnosisId(diagnosisId: number): Observable<MessageDto[]> {
    return this.http.get<any>(this.apiUrl + '/messages/' + diagnosisId);
  }
}
