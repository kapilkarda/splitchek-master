import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute, Params, Data} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessageService} from 'primeng/api';
import {AdminService} from '../../../../services/admin.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';

import * as moment from 'moment';
import {AppSettings} from '../../../../../../appSettings';


declare var google;

var country ='India';
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  @ViewChild('map',{static:false}) mapElement: ElementRef;
  model: any = { adminId: '', userId: '', catname: '', form_name: '', field: [], productMedia: [], sellerLocation: [],loc:[], productTitle: "", productImage: "", productPrice: "", dateNtime: "" };
  result: any;
  roleList:any;
  moduleArr: any = { "modules": [] };
  categories:any;
  items:any=[];
  Customer:any=[];

  imgAd = [];
  steps:number=0;
  step:number=0;
  uploadUrl = AppSettings.API_ENDPOINT;
  upImage ='../../../../../assets/img/dummy.png';
  user:any;
  postId:any;
  postData:any;
  userName:any;
 constructor(
   private router: Router,
   private activatedRoute: ActivatedRoute,
   private adminService: AdminService,
   private spinner: NgxSpinnerService,
   private messageService: MessageService,
 ) {
  if(localStorage.getItem('token') == null && localStorage.getItem('token') =='null'){
    this.router.navigate(['/']);
  }
 }
 initMap() {

  var pos;
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.397, lng: 77.644},
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;
  navigator.geolocation.getCurrentPosition(function(position) {
    let val = document.getElementById('latitude').innerHTML;
    if(val != ''){
      pos = {
        lat: parseFloat(document.getElementById('latitude').innerHTML),
        lng: parseFloat(document.getElementById('longitude').innerHTML),
      };
    }else{
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    }

    infoWindow.setPosition(pos);
    infoWindow.setContent( 'Click to set your location');
    infoWindow.open(map);
    map.setCenter(pos);
    document.getElementById('latitude').innerHTML = position.coords.latitude.toString();
    document.getElementById('longitude').innerHTML = position.coords.latitude.toString();
  });

// Create the search box and link it to the UI element.
var input = document.getElementById('pac-input');
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    // Do more work
  }
});
var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Create the initial InfoWindow.
  var infoWindow = new google.maps.InfoWindow(
      {content: 'Click to set your location', position: pos});
  infoWindow.open(map);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function (marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

    let addr = place.formatted_address.split(',');
    country = addr[addr.length - 1];
        document.getElementById('latitude').innerHTML = place.geometry.location.lat().toString();
        document.getElementById('longitude').innerHTML = place.geometry.location.lng().toString();

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);

  // Configure the click listener.
  map.addListener('click', function(mapsMouseEvent) {
    // Close the current InfoWindow.
    infoWindow.close();
    document.getElementById('latitude').innerHTML = mapsMouseEvent.latLng.lat().toString();
    document.getElementById('longitude').innerHTML = mapsMouseEvent.latLng.lng().toString();
    // Create a new InfoWindow.
    console.log(this.lat)
    infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
    infoWindow.setContent(mapsMouseEvent.latLng.toString());
    infoWindow.open(map);
  });
})
}
 ngOnInit() {

this.loadUserData();

  this.activatedRoute.params
			.subscribe(
            (params: Params) => {
				this.postId = params['id'];
            }
		);
        if (this.postId) {
          let data = {
            id:this.postId
          }
          this.model.id = this.postId;
			this.spinner.show();
			this.adminService.admin_load_postData(data).subscribe(categorydata => {
        console.log(categorydata)
            if (categorydata.status === 'success') {
              console.log(categorydata)
               this.postData = categorydata.data;
               console.log(this.postData);
               this.model.catname = this.postData.catname;
               this.model.userId = this.postData.userId;
               this.model.productTitle = this.postData.productTitle;
               this.model.productImage = this.postData.productImage;
               this.model.dateNtime = this.postData.dateNtime;
               this.model.form_name = this.postData.form_name;
               console.log(this.postData.loc,"*")
               this.model.loc = this.postData.loc;

              this.items = this.postData.field;
              this.steps = this.items.length;

              for(let item of this.postData.field){
                if(item.name == 'Ad images'){
                  this.imgAd = item.value;
                }
                if(item.name == 'Your location'){
                  country = item.value[1]
                }
                if(item.name == 'Do not disturb hours'){

                  item.option =  [{ label: 'Yes', value: true }, { label: 'No', value: false }]
                  console.log(item.value)
                  if(item.value[0].from == 'Invalid date'){
                    item.value[0].from = '';
                  }
                  else if(this.is_date(item.value[0].from)){

                    item.value[0].from = moment(item.childs[0].from).format("h:mm")
                  }

                  if(item.value[0].to == 'Invalid date'){
                    item.value[0].to = '';
                  }if(this.is_date(item.value[0].to)){

                    item.value[0].to = moment(item.value[0].to).format("h:mm")
                  }
                }

              }
              // get index of object with name

              this.model.field = this.postData.field;
              if(this.model.loc){

                document.getElementById('latitude').innerHTML = this.model.loc[0];
                document.getElementById('longitude').innerHTML = this.model.loc[1];
              }
               console.log("modellll ",this.model)
               this.spinner.hide();
            }
         });
         this.loadCategoryData()
      }
  this.user = JSON.parse(localStorage.getItem('userInfo'))
  this.model.adminId = this.user.id;

  this.initMap();
 }
 getCatValue(e){
   console.log(e.form)
   this.loadFormData(e.form);
 }
 loadUserData() {
  console.log("hhhhhhhhhhhh")
  this.spinner.show();
    this.adminService.getUserList().subscribe((result) => {
    this.result = result;
  },
  (err) => this.spinner.hide(),
  () => {
    if (this.result.status === 'success') {

      this.Customer = this.result.data;
      console.log(this.Customer)
      this.spinner.hide();
    } else {
      this.spinner.hide();
      this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
    }
  });
}

 loadFormData(form) {
   let data = {
     id:form
   }
   this.spinner.show();
     this.adminService.getFormData(data).subscribe((result) => {
     this.result = result;
     console.log(this.result)
   },
   (err) => this.spinner.hide(),
   () => {
     if (this.result.status === 'success') {
       let items = this.result.data[0];
       this.model.form_name = items.form_name;
       console.log(items.field);

        this.items = items.field;
        this.steps = this.items.length;

       console.log(this.items)
       this.spinner.hide();
     } else {
       this.spinner.hide();
       this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
     }
   });
 }
 loadCategoryData() {
   console.log("hhhhhhhhhhhh")
   this.spinner.show();
     this.adminService.adminGetCategoryList().subscribe((result) => {
     this.result = result;
   },
   (err) => this.spinner.hide(),
   () => {
     if (this.result.status === 'success') {
       const categories = this.result.data;
       let datCat = []
       for(let d of categories){
         if(d.form != 0){
           datCat.push(d)
         }
       }
       let objectName = {
          catname:'Choose Category',
          _id:''
        }
       this.categories = datCat;

      this.categories.splice(0, 0, objectName)
       // console.log(this.catList)
       this.spinner.hide();
     } else {
       this.spinner.hide();
       this.messageService.add({severity:'error', summary: 'Success', detail:this.result.message});
     }
   });
 }

 add_category() {
   this.model.field = this.items;

   this.model.field.push({name:'Ad images', type:'file', value:this.imgAd});
   this.model.productMedia = this.imgAd;
   const date = moment().format("Do MMM YYYY");
   const time = moment().format("h:mm a")
   const mdate = date + ' at ' + time;
   this.model.field = this.items;
   this.model.dateNtime = mdate;
   console.log(this.model)
  this.model.field.push({name:'AdPost create date','type':'',})
   let lat = document.getElementById('latitude').innerHTML;
   let long = document.getElementById('longitude').innerHTML;
   for (let item of this.model.field) {
    if(item.name === 'Title'){
      item.value = this.model.productTitle
    }
    if(item.name === 'AdPost create date'){
      item.value = moment().format('YYYY-MM-DD HH:mm:ss')
    }
    if(item.name === 'Your location'){
      item.value = [{
        "latitude": document.getElementById('latitude').innerHTML,
        "longitude": document.getElementById('longitude').innerHTML,
        "latitudeDelta": 0.0922,
        "longitudeDelta": 0.0421
    }, country]
    }

    if (item.name == 'Price') {
      this.model.productPrice = item.value;
    }
    if(item.name == 'Do not disturb hours'){

      console.log(item.value)
      if(item.value[0].from == ''){
        item.value[0].from = '';
      }else if (this.is_date(item.value[0].from )){
        item.value[0].fromDateTime = item.value[0].from;
        item.value[0].from = moment(item.value[0].from).format("h:mm")
      }
      if(item.value[0].to == ''){
        item.value[0].to = '';
      }else  if (this.is_date(item.value[0].to )){

        item.value[0].toDateTime = item.value[0].to;
        item.value[0].to = moment(item.value[0].to).format("h:mm")
      }
    }
    // if (Array.isArray(item.childs)) {
    //   item.childs.forEach(item => {
    //     item.value = moment(item.value).format("hh:mm")
    //     this.model.field.push(item);
    //   });
    // }

  }
   this.model.loc = [lat,long];
   this.spinner.show();
   this.adminService.editAdminPost(this.model).subscribe(result => {
     this.result = result;
   },
   (err) => console.log(err),
   () => {
     if (this.result.status === 'success') {
       this.spinner.hide();
       this.messageService.add({ severity: 'success', summary: 'Success', detail: this.result.message });
       this.router.navigate(['/admin/listPost']);
     } else {
       this.spinner.hide();
       this.messageService.add({ severity: 'error', summary: 'Error', detail: this.result.message });
     }
   });
 }
 is_date(input) {
  if ( Object.prototype.toString.call(input) === "[object Date]" )
    return true;
  return false;
    };
 uploadProgress(){
  this.spinner.show();
 }
 onBasicUploadAuto(e,i){
  this.spinner.hide();
   console.log(e,i)
   let path = e.originalEvent.body.data[0].filename;
   this.items[i].value = path;
   this.upImage = path;
 }
 onBasicPimage(e){
  this.spinner.hide();
   let path = e.originalEvent.body.data[0].filename;
   this.model.productImage = path;
 }
 next(){
   if(this.step < this.items.length){
     this.step++;
   }
 }
 prev(){
   if(this.step != 0){
     this.step--;
   }
 }
 getUser(id){
  for(let k of this.Customer){
    if(k._id == id){
      // console.log(k)
      return k.name
    }
  }
}
formatDate(date){
  return new Date(date)
}
chkArray(val){
  return Array.isArray(val);
}
addAd(){
  if(this.imgAd.length < 7){
    this.imgAd.push({filename:''})
  }
}
remAd(i){
  if(this.imgAd.length > 1){
    this.imgAd.splice(i,1)
  }
}
onBasicUploadAdd(e,i){
  this.spinner.hide();
  console.log(e, i)
  let path = e.originalEvent.body.data[0].filename;
  this.imgAd[i].filename = path;
}
getDonotDistrub(e,f){
  console.log(e,f)
  f['isSelected'] = e;

}
}
