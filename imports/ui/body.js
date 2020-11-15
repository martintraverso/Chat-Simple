import { Template } from 'meteor/templating';
import './body.html';
import { Messages } from '../api/messages.js';
import './message.js';

Template.body.helpers({
    messages() {
    return Messages.find();
  },
});

Template.body.events({
    'submit .new-message'(event) {
      event.preventDefault();
      const target = event.target;
      const text = target.text.value;
      if(! Meteor.userId)
        throw new Meteor.Error('Usuario no registrado.')
        Messages.insert({
        text,
        createdAt: new Date(), 
        owner: Meteor.userId(), username:Meteor.user().username,
      });
      target.text.value = '';
      $('.card-body').scrollTop($('.media-list').height())
     },
  });