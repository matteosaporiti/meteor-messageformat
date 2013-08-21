if (Meteor.isClient) {

  Template.main.getName = function() {
    var lang = Session.get('lang');
    return lang == 'he' ? 'גדי' : 'Gadi';
  }

  Session.setDefault('NUM', 1);
  Template.main.getNum = function() {
    return Session.get('NUM');
  }

  function myTrim(text, indent) {
    text = text.replace(/^\n*/, '').replace(/\t/g, '  ');
    var re = /^ */;
    var origIndent = re.exec(text)[0];
    re = new RegExp('^' + origIndent, 'gm');
    return text.replace(re, indent).replace(/\s*$/, '');
  }

  Template.main.example = function(key, message, params) {
    var js;
    if (typeof key == "function") {
        // if called as a block helper
        message = myTrim(key.fn(this), '   ');
        console.log(message)
        params = { hash: key.hash };
        console.log(params);
        js = myTrim(key.inverse(this), '');
        key = params.KEY;
    } else {
        console.log(params);
        message = params ? message : null;
        js = params.extra;
        console.log(params);
    }
    return new Handlebars.SafeString(Template.example({
      key: key, message: message, params: params, js: js,
      paramOverride: params.hash && params.hash.paramOverride
    }));
  }
  Template.example.blah = function() {
    console.log(this);
  }

  Template.example.paramsStr = function() {
    var out = '';
    var params = this.params.hash;
    for (key in params)
      out += ' ' + key + '="' + params[key] + '"';
    return out;
  }

  Template.example.longMessage = function() {
    return this.message.length > 20;
  }

  Session.setDefault('lang', 'en');
  Template.langButtons.events({
    'click button': function(event) {
      var lang = $(event.target).val();
      Session.set('lang', lang);
      Session.set('locale', lang);
    }
  });
  Template.langButtons.isLang = function(lang) {
    return Session.equals('lang', lang);
  }

  Template.numButton.events({
    'click button': function(event) {
      Session.set('NUM', $(event.target).val());
    }
  });


  function setBodyDir() {
    // There will ultimately be a better way to do this in the final package
    var lang = Session.get('lang');
    $('body').attr('dir', lang == 'he' ? 'rtl' : 'ltr');    
  }
  Deps.autorun(setBodyDir);
  Meteor.startup(setBodyDir);

}