import { Component } from '@angular/core';

@Component({
  selector: 'app-conversation',
  template:  `
  <h2> Random Conversation </h2>
    @for (msg of messages; track msg.sender) {
      <div>
        <strong>{{ msg.sender }}</strong>: {{ msg.content }}
      </div>
}
  `,
  styleUrl: './conversation.css',
})
export class Conversation {
  
 messages = [
    {sender: 'ana', content:'Hallo Klasse!🫀'},
    {sender: 'klasse', content: 'Hallo Ana!🙂‍↔️'}, 
    {sender: 'ana', content: 'Wie läuft es bei euch?'}, 
    {sender: 'klasse', content: '... langsam, aber es läuft ...'}
  ];}
