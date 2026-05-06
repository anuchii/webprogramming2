import { Component } from '@angular/core';

@Component({
  selector: 'app-message-list',
  imports: [],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {

  messages = [
    {sender: 'ana', content:'Hallo Klasse!🫀'},
    {sender: 'klasse', content: 'Hallo Ana!🙂‍↔️'}, 
    {sender: 'ana', content: 'Wie läuft es bei euch?'}, 
    {sender: 'klasse', content: '... langsam, aber es läuft ...'}
  ];
}
