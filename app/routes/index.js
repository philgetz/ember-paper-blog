import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    var promise = Ember.$.ajax({
      type: 'get',
      url: 'http://paper-blog-api.herokuapp.com'
    }).then(function(data){
      var updatedInfo = data.data.map(function(each){
        var date = each.createdAt.split('').slice(0,7).join('');
        var shortext = '';
        if(each.text.length > 300){
          shortext = each.text.split('').slice(0,300).join('') + '...';
        }else{
          shortext = each.text;
        }

        return {
          id:each.id,
          title:each.title,
          text: shortext,
          imgUrl: each.imgUrl,
          date:date
        };
      });
      return updatedInfo;
    });

    return promise;
  }
});
