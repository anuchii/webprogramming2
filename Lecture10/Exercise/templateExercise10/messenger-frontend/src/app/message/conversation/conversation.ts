import { Component } from '@angular/core';

@Component({
  selector: 'app-conversation',
  imports: [],
  templateUrl: './conversation.html',
  styleUrl: './conversation.css',
})
export class Conversation {
  
 messages = [
    {sender: 'ana', content:'Hallo Klasse!🫀'},
    {sender: 'klasse', content: 'Hallo Ana!🙂‍↔️'}, 
    {sender: 'ana', content: 'Wie läuft es bei euch?'}, 
    {sender: 'klasse', content: '... langsam, aber es läuft ...'}
  ];}
