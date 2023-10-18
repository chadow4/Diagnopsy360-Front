import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {DiagnosisService} from "../../services/diagnosis.service";
import {SendSymtomsDiagnosisDto} from "../../models/diagnosis.model";

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit {

    currentQuestionIndex: number = 0;
    totalQuestions: number = 0;

    isFinished: boolean = false;

    qcmStarted: boolean = false;


    diagnosticQuestions = [
        {
            questionText: "Comment vous sentez-vous en général?",
            options: ["Très bien", "Bien", "Moyen", "Mal"]
        },
        {
            questionText: "Avez-vous des problèmes de sommeil?",
            options: ["Pas du tout", "Occasionnellement", "Souvent", "Toujours"]
        },
        {
            questionText: "Êtes-vous souvent anxieux?",
            options: ["Jamais", "Rarement", "Souvent", "Toujours"]
        },
        {
            questionText: "Avez-vous des pensées suicidaires?",
            options: ["Jamais", "Rarement", "Parfois", "Souvent"]
        },
        {
            questionText: "Avez-vous des antécédents de troubles mentaux?",
            options: ["Non", "Oui, dans la famille", "Oui, moi-même", "Plusieurs fois"]
        },
        {
            questionText: "Êtes-vous satisfait de vos relations personnelles?",
            options: ["Très satisfait", "Satisfait", "Insatisfait", "Très insatisfait"]
        },
        {
            questionText: "Comment gérez-vous le stress?",
            options: ["Bien", "Moyen", "Mal", "Pas du tout"]
        },
        {
            questionText: "Êtes-vous souvent en colère?",
            options: ["Jamais", "Rarement", "Souvent", "Toujours"]
        },
        {
            questionText: "Êtes-vous satisfait de votre travail?",
            options: ["Très satisfait", "Satisfait", "Insatisfait", "Très insatisfait"]
        },
        {
            questionText: "Avez-vous des problèmes de concentration?",
            options: ["Jamais", "Rarement", "Souvent", "Toujours"]
        }
    ];


    myResponses: string[] = [];


    constructor(private router: Router,
                private alertService: AlertService,
                private diagnosisService: DiagnosisService) {
    }

    ngOnInit(): void {
        this.initializeMyResponses();
        this.totalQuestions = this.diagnosticQuestions.length;
    }

    public startQcm() {
        this.qcmStarted = true;
    }

    public goToNextQuestion() {
        console.log(this.currentQuestionIndex);
        console.log(this.totalQuestions)


        if (this.currentQuestionIndex + 1 == this.totalQuestions) {
            this.qcmStarted = false;
            this.isFinished = true;
        } else {
            this.currentQuestionIndex++;
        }

    }

    public goToPreviousQuestion() {
        if (this.currentQuestionIndex > 0) this.currentQuestionIndex--;
    }

    public goToQuestion(index: number) {
        this.currentQuestionIndex = index;
    }

    private initializeMyResponses() {
        for (let i = 0; i < this.diagnosticQuestions.length; i++) {
            this.myResponses.push("");
        }
    }

    public sendResponses() {

        const mySymtoms: SendSymtomsDiagnosisDto = {
            symptoms: this.myResponses
        }
        this.diagnosisService.sendSymptomsDiagnosis(mySymtoms).subscribe((response) => {
            this.alertService.success(response.message);
        }, (error) => {
            this.alertService.error(error.error.message);
        });
        this.router.navigate(['home']);
    }
}
