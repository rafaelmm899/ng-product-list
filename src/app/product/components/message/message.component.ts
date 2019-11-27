import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from './message.service';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {

    message: any = {};
    subscription: Subscription;
    public alerts: any[];

    constructor(private messageService: MessageService) {

        this.subscription = this.messageService.getMessage().subscribe(message => { this.showMessage(message.text, message.type) });
        this.alerts = [];
    }

    showMessage(message: string, type: string): void {
        this.alerts.push({
            type: type,
            msg: message
        });

        setTimeout(() => {
            this.alerts = [];
        }, 5000);
    }
}
