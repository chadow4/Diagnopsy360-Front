import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DiagnosisService} from "../../services/diagnosis.service";
import {DiagnosisDto} from "../../models/diagnosis.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {MessageService} from "../../services/message.service";
import {AuthService} from "../../services/auth.service";
import {zip} from "rxjs";
import {UserDto} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {MessageSocketDto, MessageSocketPrinterDto} from "../../models/message.model";

@Component({
  selector: 'app-diagnosis-details',
  templateUrl: './diagnosis-details.component.html',
  styleUrls: ['./diagnosis-details.component.scss']
})
export class DiagnosisDetailsComponent implements OnInit {

  diagnosis?: DiagnosisDto;
  messages: MessageSocketPrinterDto[] = [];
  newMessageContent: string = '';
  myInformations?: UserDto;

  @ViewChild('msger') private msger!: ElementRef;

  constructor(private diagnosisService: DiagnosisService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private router: Router,
              private messageService: MessageService,
              private authService: AuthService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    const id = parseInt(<string>this.route.snapshot.paramMap.get('id'), 10);
    zip(this.userService.getMyInfos(), this.diagnosisService.getDiagnosisById(id)).subscribe({
        next: ([userInfo, diagnosis]) => {
          this.myInformations = userInfo;
          this.diagnosis = diagnosis;
          this.messageService.joinChat(this.myInformations.id!);
          this.fetchMessagesByDiagnosisId(this.diagnosis.id);
          this.fetchSocketMessages(this.diagnosis.id);
        },
        error: (error) => {
          this.router.navigate(['/']).then(() => this.alertService.error(error.error.message));
        }
      }
    );
  }

  private fetchMessagesByDiagnosisId(diagnosisId: number) {
    this.messageService.getMessagesByDiagnosisId(diagnosisId).subscribe(messages => {
      this.messages = messages.map(message => ({
        authorFirstname: message.author.firstname,
        content: message.content,
      }));
    });
  }

  private fetchSocketMessages(diagnosisId: number) {
    this.messageService.getMessages().subscribe((message) => {
      if (message.diagnosisId ! == this.diagnosis?.id) {
        this.messages.push(message);
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.msger.nativeElement.scrollTo({
        top: this.msger.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    } catch (err) {
      console.error('Could not find the "msger" element.', err);
    }
  }

  sendMessage(): void {
    if (this.newMessageContent.trim()) {
      let destinationId: number;

      if (this.myInformations?.role === "doctor") {
        destinationId = this.diagnosis!.patient.id;
      } else {
        destinationId = this.diagnosis!.doctor.id;
      }

      const messageSocket: MessageSocketDto = {
        authorId: this.myInformations!.id,
        content: this.newMessageContent,
        diagnosisId: this.diagnosis!.id,
        authorFirstname: this.myInformations!.firstname,
        destinationId: destinationId
      };

      this.messageService.sendMessage(messageSocket);
      this.newMessageContent = '';
    }
  }

}
