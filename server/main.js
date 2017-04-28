import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

Resolutions = new Mongo.Collection('resolutions');
Meteor.startup(() => {


});
Meteor.publish("resolutions", function(){
return Resolutions.find({
  $or: [
    { private:{$ne: true} },
    { owner: this.userId}
  ]
});

});
Meteor.methods({
  addResolution: function(title){
    Resolutions.insert({
      title: title,
      createAt: new Date(),
      owner: Meteor.userId()
    });
  },
  updateResolution: function(id, checked){
    var res = Resolutions.findOne(id);

    if(res.owner !==Meteor.userId()){
      throw new Meteor.Error('not-aurothorized');
    }

    Resolutions.update(id, {$set: { checked: checked}});
  },
  deleteResolution: function(id){
    var res = Resolutions.findOne(id);

    if(res.owner !==Meteor.userId()){
      throw new Meteor.Error('not-aurothorized');

    }

    Resolutions.remove(id);
  },
  setPrivate: function(id, private){
    var res = Resolutions.findOne(id);

    if(res.owner !==Meteor.userId()){
      throw new Meteor.Error('not-aurothorized');
    }

    Resolutions.update(id, {$set: { private: private}});
  }
});
