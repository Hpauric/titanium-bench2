

var parcels;
/*
jQuery.ajax({
        url:'https://api.decentraland.org/v1/map.png?width=50&height=50&size=5&center=20,21',
        cache:false,
        xhr:function(){// Seems like the only way to get access to the xhr object
            var xhr = new XMLHttpRequest();
            xhr.responseType= 'blob'
            return xhr;
        },
        success: function(data){
          
          
          console.log(data);
          
            var url = window.URL || window.webkitURL;
            $('img').attr('src', url.createObjectURL(data))
        },
        error:function(){
            console.log('error occured');
        }
    });
*/

function toColor(value){
  //if(value > 1000000){
    if(value > 20000){
   return 'silver'; 
  }
  
  value = value/20000;
  
  var h = (1.0 - value) * 240
  return "hsl(" + h + ", 100%, 40%)";
}

function toTextColor(value){
  //if(value > 1000000){
  if(value > 20000){
   return 'gold'; 
  }
  
  value = value/20000;
  
  var h = (1.0 - value) * 240
  return "hsl(" + h + ", 100%, 40%)";
}


function addContainerDivs(){
  var rowFrag = document.createDocumentFragment();
  for(var i = 7; i <=36; i++){
  rowFrag.append($('<div class="containerDiv"><div id="myDiv' + i + '" class="bigSquares"></div></div>')[0]);
  }
  
  $('body').append(rowFrag);
  
    
}

function drawRow(topLeft, divIdNumber){
  
  var rowFrag = document.createDocumentFragment();
    
  draw50By50('nw=-150,' + topLeft.toString() + '&se=-100,' + (topLeft-50).toString(), 'myDiv' + divIdNumber); 
  draw50By50('nw=-101,' + topLeft.toString() + '&se=-50,' + (topLeft-50).toString(), 'myDiv' + (divIdNumber + 1).toString());
  draw50By50('nw=-51,' + topLeft.toString() + '&se=0,' + (topLeft-50).toString(), 'myDiv' + (divIdNumber+ 2).toString());
  draw50By50('nw=1,' + topLeft.toString() + '&se=50,' + (topLeft-50).toString(), 'myDiv' + (divIdNumber+ 3).toString());
  draw50By50('nw=51,' + topLeft.toString() + '&se=100,'+ (topLeft-50).toString(), 'myDiv' + (divIdNumber+ 4).toString());
  draw50By50('nw=101,' + topLeft.toString() + '&se=150,'+ (topLeft-50).toString(), 'myDiv' + (divIdNumber+ 5).toString());
  
  $('body').append(rowFrag);
}

$(document).ready( function () {
  
  
  addContainerDivs();
  
  /*
  draw50By50('nw=-150,150&se=-100,100', 'myDiv1');
  draw50By50('nw=-101,150&se=-50,100', 'myDiv2');
  draw50By50('nw=-51,150&se=0,100', 'myDiv3');
  draw50By50('nw=1,150&se=50,100', 'myDiv4');
  draw50By50('nw=51,150&se=100,100', 'myDiv5');
  draw50By50('nw=101,150&se=150,100', 'myDiv6');
  */
  
  drawRow(150, 1);
  drawRow(100, 7);
  drawRow(50, 13);
  drawRow(0, 19);
  drawRow(-50, 25);
  drawRow(-100, 31);

    
} );

function draw50By50(coords, divId){
  $.ajax({
   type: 'GET',
  url: 'https://api.decentraland.org/v1//map?' + coords,
    success: function(data) {
      console.log("success");
      
      var newParcels = data.data.assets.parcels;
      
      var $newdiv1; 
      var tmp = '';
      var frag = document.createDocumentFragment();
      
      for(var i=0; i < newParcels.length; i++){
             
        if(newParcels[i].last_transferred_at !== null) {
        }
             
        $newdiv1 = $('<div class="miniSquares" style="display:inline-block"></div>');
        if(newParcels[i].auction_price !== null){
          $newdiv1.css("background-color", toColor(newParcels[i].auction_price) );
        }       
        if(newParcels[i].publication !== null ){
          if(newParcels[i].publication.status === "open" ){
          $newdiv1.css("border-width", "1px" );
          $newdiv1.css("background-color", toColor(newParcels[i].publication.price) );
          $newdiv1.css("border-color", toTextColor(newParcels[i].publication.price) );
          }
        }
        
        if(newParcels[i].district_id !== null ){
          if(newParcels[i].district_id == "f77140f9-c7b4-4787-89c9-9fa0e219b079" ){
          $newdiv1.css("background-color", "gray" );
          }
          else if(newParcels[i].district_id == "55327350-d9f0-4cae-b0f3-8745a0431099"){
          $newdiv1.css("background-color", "green" );
          
          }
          else {       
           $newdiv1.css("background-color", "purple" ); 
          }    
        }
        frag.append($newdiv1[0]);     
      }  
      $('#' + divId).append(frag);
    }
  });
};
/*
$.ajax({
   type: 'GET',
    //url: 'https://api.decentraland.org/v1//map?nw=-49,-2&se=-45,-6',
  //url: 'https://api.decentraland.org/v1//map?nw=-52,-2&se=20,-22',
  url: 'https://api.decentraland.org/v1//map?nw=-100,100&se=-50,50',
    success: function(data) {
      console.log("success");
      
      var newParcels = data.data.assets.parcels;
      
      
      var tmp = '';
      var frag = document.createDocumentFragment();
      
      for(var i=0; i < newParcels.length; i++){
             
        if(newParcels[i].last_transferred_at !== null) {
          //console.log(newParcels[i]);
        }
             
        $newdiv1 = $('<div class="miniSquares" style="display:inline-block"></div>');
        //$newdiv1.text( newParcels[i].id);
        if(newParcels[i].auction_price !== null){
          $newdiv1.css("background-color", toColor(newParcels[i].auction_price) );
          //$newdiv1.css("color", toTextColor(newParcels[i].auction_price) );
        }       
        if(newParcels[i].publication !== null ){
          if(newParcels[i].publication.status === "open" ){
          $newdiv1.css("border-width", "1px" );
          $newdiv1.css("background-color", toColor(newParcels[i].publication.price) );
          $newdiv1.css("border-color", toTextColor(newParcels[i].publication.price) );
          //$newdiv1.css("color", toTextColor(newParcels[i].auction_price) );
          }
        }
        
        
        if(newParcels[i].district_id !== null ){
          if(newParcels[i].district_id == "f77140f9-c7b4-4787-89c9-9fa0e219b079" ){
          $newdiv1.css("background-color", "gray" );
          }
          else if(newParcels[i].district_id == "55327350-d9f0-4cae-b0f3-8745a0431099"){
          $newdiv1.css("background-color", "green" );
          
          }
          else {
            
           $newdiv1.css("background-color", "purple" ); 
          }
          //$newdiv1.css("color", toTextColor(newParcels[i].auction_price) );
          
        }
        
        //console.log($newdiv1);
        frag.append($newdiv1[0]);
        //tmp += $newdiv1[0];
        
      }
      console.log(tmp);
      
      $('#myDiv2').append(frag);
    }
  });

*/

/*$.ajax({
   type: 'GET',
    //url: 'https://api.decentraland.org/v1//map?nw=-49,-2&se=-45,-6',
  //url: 'https://api.decentraland.org/v1//map?nw=-52,-2&se=20,-22',
  //url: 'https://api.decentraland.org/v1//map?nw=-150,150&se=-100,100',
    success: function(data) {
      console.log("success");
      
      var newParcels = data.data.assets.parcels;
      
      var $newdiv1; 
      
      for(var i=0; i < newParcels.length; i++){
             
        if(newParcels[i].last_transferred_at !== null) {
          console.log(newParcels[i]);
        }
             
        $newdiv1 = $('<div class="miniSquares" style="display:inline-block"></div>');
        //$newdiv1.text( newParcels[i].id);
        if(newParcels[i].auction_price !== null){
          $newdiv1.css("background-color", toColor(newParcels[i].auction_price) );
          //$newdiv1.css("color", toTextColor(newParcels[i].auction_price) );
        }       
        $('#myDiv').append($newdiv1);
      }
    }
  });

*/






/*
$.ajax({
    type: 'GET',
    url: 'https://api.decentraland.org/v1/parcels?status=open&limit=200&sort_by=price',
    success: function(data) {
      //console.log("success");
      //console.log(data.data.parcels); 
      parcels = data.data.parcels;
       
      $('#table_id').DataTable( {
      data: parcels,
      columns: [
        { data: 'id' },
        { data: 'publication.price' },
        { data: 'auction_price' },
        { data: null},
        { data: null},
        { data: 'publication.asset_type' }
        ],
        "pageLength": 50
      });
      
      
      for(var i=0; i < parcels.length; i++){
        if(parcels[i].tags.proximity !== undefined) {
          //console.log(parcels[i].tags.proximity);
         
          if(parcels[i].tags.proximity.road !== undefined) {
          $('#table_id > tbody > tr:nth-child(' + (i + 1) + ') > td:nth-child(4)').text(parcels[i].tags.proximity.road.distance);
          }
          $('#table_id > tbody > tr:nth-child(' + (i + 1) + ') > td:nth-child(5)').text(Object.keys(parcels[i].tags.proximity).length);
          $('#table_id > tbody > tr:nth-child(' + (i + 1) + ') > td:nth-child(6)').text(JSON.stringify(parcels[i].tags.proximity));
        }
        else {
        $('#table_id > tbody > tr:nth-child(' + (i + 1) + ') > td:nth-child(4)').text('');
          $('#table_id > tbody > tr:nth-child(' + (i + 1) + ') > td:nth-child(5)').text('');
        }
      }
      
      
      
  }
});

*/
