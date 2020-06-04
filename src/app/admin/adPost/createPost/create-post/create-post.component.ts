import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../../services/admin.service';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/core';
import { NzTreeComponent } from 'ng-zorro-antd/tree';

import * as moment from 'moment';

import { AppSettings } from '../../../../../../appSettings';
import { isArray } from 'util';
declare var google;
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  nodes: NzTreeNodeOptions[] = [];
  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent: NzTreeComponent;
  model: any = { adminId: '', userId: '', catname: '', form_name: '', field: [], productMedia: [], sellerLocation: [], loc: [], productTitle: "", productImage: "", productPrice: "", dateNtime: "",isPostSide:1,featured:0 };
  expandKeys = [];
  searchValue = '';
  imgAd = [{'filename':''}];
  staticField: any = [
    { name: 'Title', type: 'Input', icon: '', value: '' },
    { name: 'Price', type: 'number', icon: 'KWD', value: '' },
    { name: 'Description', type: 'Input', icon: '', value: '' },
    { name: 'Type of your listing', type: 'Select', icon: '', value: '', option: [{ label: 'Personal', value: 'Personal' }, { label: 'Business', value: 'Business' }] },

    { name: 'Add Additional Number', type: 'number', icon: '', value: '' },
    { name: 'Hide Registered Number', type: 'Checkbox', icon: '', value: false },
    {
      name: 'Do not disturb hours', type: 'Radio', icon: '', value: '',
      option: [{ label: 'Yes', value: true }, { label: 'No', value: false }], childs: [
        { name: 'from', type: 'Timepicker', icon: '', value: '' },
        { name: 'to', type: 'Timepicker', icon: '', value: '' },
        { name: 'fromDateTime', type: 'hidden', icon: '', value: '' },
        { name: 'toDateTime', type: 'hidden', icon: '', value: '' },
      ], flex: true
    },
    // { name: ' Seller Number', type: 'number', icon: '', value: '' },
    // { name: 'Seller Name', type: 'text', icon: '', value: '' },
    {name:'Seller profile image', type:'file', value:''},
    {name:'AdPost create date', type:'Datepicker', value:''},

  ]
  categoryData: any = [];
  result: any;
  roleList: any;
  moduleArr: any = { "modules": [] };
  categories: any = [];
  items: any = [];
  Customer: any = [{ "name": "customer 1", _id: '1' }, { "name": "customer 2", _id: '2' }, { "name": "customer 3", _id: '3' }]
  steps: number = 0;
  step: number = 0;
  uploadUrl = AppSettings.API_ENDPOINT;
  upImage = '../../../../../assets/img/dummy.png';
  user: any;
  userlistData: any;
  cats: any
  lat: any;
  long: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
  ) {
    navigator.geolocation.getCurrentPosition(this.showPosition)

  }

  showPosition(position) {
    console.log(position.coords.latitude)
  }
  initMap() {

    var pos;
    var map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 22.397, lng: 77.644 },
      zoom: 15,
      mapTypeId: 'roadmap'
    });
    infoWindow = new google.maps.InfoWindow;
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('Click to set your location');
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
      { content: 'Click to set your location', position: pos });
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
      map.addListener('click', function (mapsMouseEvent) {
        // Close the current InfoWindow.
        infoWindow.close();
        document.getElementById('latitude').innerHTML = mapsMouseEvent.latLng.lat().toString();
        document.getElementById('longitude').innerHTML = mapsMouseEvent.latLng.lng().toString();
        // Create a new InfoWindow.
        console.log(this.lat)
        infoWindow = new google.maps.InfoWindow({ position: mapsMouseEvent.latLng });
        infoWindow.setContent(mapsMouseEvent.latLng.toString());
        infoWindow.open(map);
      });
    })
  }

  ngOnInit() {
    //  console.log(moment().format("Do MMM YYYY h:mm a"))
    if (localStorage.getItem('token') == null && localStorage.getItem('token') == 'null') {
      this.router.navigate(['/']);
    }
    this.user = JSON.parse(localStorage.getItem('userInfo'))
    console.log(this.user)
    this.model.adminId = this.user._id;
    this.loadCategoryData();

    this.loadUserData()
    this.initMap();
  }
  getCatValue(e) {
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
          this.userlistData = this.result.data;
          console.log(this.userlistData)
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
        }
      });
  }

  loadFormData(form) {
    let data = {
      id: form
    }
    console.log(form, "*************")
    this.spinner.show();
    this.adminService.getFormData(data).subscribe((result) => {
      this.result = result;
    },
      (err) => this.spinner.hide(),
      () => {
        if (this.result.status === 'success') {
          let items = this.result.data[0];
          this.model.form_name = items.form_name;
          this.items = items.fields;
          this.steps = this.items.length;
          console.log(this.items)
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });
        }
      });
  }
  loadCategoryData() {
    console.log("hhhhhhhhhhhh")
    this.spinner.show();
    this.adminService.adminGetPagedCategoryList().subscribe((result) => {
      this.result = result;
    },
      (err) => this.spinner.hide(),
      () => {
        if (this.result.status === 'success') {

          const categories = this.result.data;
          console.log(categories)
          let datCat = []
          for (let item of categories) {
            let obj = {
              "key": item.name,
              "title": item.name,
              "children": this.ShowSubCatData(item.subCat)
            }
            datCat.push(obj)

          }
          this.categories = datCat;
          this.categoryData = this.result.data;
          this.nodes = datCat;
          console.log(this.categories)
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.messageService.add({ severity: 'error', summary: 'Success', detail: this.result.message });

          // let arr = []
          // for(let item of this.result.data){
          //   let obj = {
          //     "name":item.name,
          //     "id":item._id,
          //     "children":this.ShowSubCatData(item.subCat)
          //   }
          //   arr.push(obj)
          // }
          //  this.categories = arr;
          //  console.log(this.categories)
        }
      });
  }

  add_category() {
    const date = moment().format("Do MMM YYYY");
    const time = moment().format("h:mm a")
    const mdate = date + ' at ' + time;
    this.model.field = this.items;
    this.model.field.push({name:'Ad images', type:'ImagePicker', value:this.imgAd});
    this.model.field.push({name:'Your location',type:'Select',"value": [{
      "latitude": document.getElementById('latitude').innerHTML,
      "longitude": document.getElementById('longitude').innerHTML,
      "latitudeDelta": 0.0922,
      "longitudeDelta": 0.0421
  }, ""]})
    for (let item of this.staticField) {
      if (item.name == 'Price') {
        this.model.productPrice = item.value;
      }
      if(item.name == 'Do not disturb hours'){


        if(item.childs[0].value == ''){
          item.childs[0].value = '';
        }else{
          item.childs[0].value = moment(item.childs[0].value).format("h:mm")
          item.childs[2].value = item.childs[0].value;
        }
        if(item.childs[1].value == ''){
          item.childs[1].value = '';
        }else{

          item.childs[1].value = moment(item.childs[1].value).format("h:mm")
          item.childs[3].value = item.childs[1].value;
        }
        item.value = item.childs
      }
      // if (Array.isArray(item.childs)) {
      //   item.childs.forEach(item => {
      //     item.value = moment(item.value).format("hh:mm")
      //     this.model.field.push(item);
      //   });
      // }

      this.model.field.push(item);
    }


    console.log("Data", this.staticField)
    this.model.userId = this.model.userId._id;

    let lat = document.getElementById('latitude').innerHTML;
    let long = document.getElementById('longitude').innerHTML;

    this.model.loc = [lat, long];
    this.model.dateNtime = mdate;
    console.log(this.model)
    this.spinner.show();
    this.adminService.addAdminPost(this.model).subscribe(result => {
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
  uploadProgress() {
    this.spinner.show();
  }
  onBasicUploadAuto(e, i) {
    this.spinner.hide();
    console.log(e, i)
    let path = e.originalEvent.body.data[0].filename;
    this.staticField[i].value = path;
    this.upImage = path;
  }

  onBasicPimage(e) {
    let imgArr = [];
    this.spinner.hide();
    let path = e.originalEvent.body.data[0].filename;
    console.log(path)
    this.model.productImage = path;
    imgArr.push({
      filename:path
    })
    this.model.productMedia = imgArr;
  }
  next() {
    if (this.step < this.items.length) {
      this.step++;
    }
  }
  prev() {
    if (this.step != 0) {
      this.step--;
    }
  }

  ShowSubCatData(data) {
    let arr = [];
    for (let item of data) {
      let obj = {
        "key": item.name,
        "title": item.name
      }
      if (item.subCat) {
        let d = this.showSubtosub(item.subCat)
        if (d.length > 0) {
          obj['children'] = d;
        } else {
          obj['form'] = item.form;
          obj['isLeaf'] = true;
        }
      }

      arr.push(obj)
    }
    let vs = arr;
    console.log(vs)
    return vs;
  }
  showSubtosub(data) {
    let arr = [];
    for (let item of data) {
      let obj = {
        "key": item.name,
        "title": item.name,
      }
      if (item.subCat) {
        let d = this.showSubtosub(item.subCat)
        if (d.length > 0) {
          obj['children'] = d;
        } else {
          obj['form'] = item.form;
          obj['isLeaf'] = true;
        }
      }

      arr.push(obj)
    }
    return arr;
  }
  getIDArr(data) {
    let arr = [];
    for (let item of data) {
      let obj = {
        id: item._id,
        status: item.status
      }

      arr.push(item._id);
      if (item.subCat) {
        let d = this.getSubId(item.subCat)
        arr.push(d);
      }
    }
    return arr;
  }
  getSubId(data) {
    let arr = [];
    for (let item of data) {
      let obj = {
        id: item._id,
        status: item.status
      }

      arr.push(item._id);
      if (item.subCat) {
        let d = this.getSubId(item.subCat)
        arr.push(d);
      }
    }
    return arr;
  }
  nzEvent(e) {
    console.log(e)
    if (e.eventName == 'click') {
      if (e.node.origin.isLeaf == true) {
        this.searchValue = e.node.key;
        this.model.catname = e.node.key;
        this.loadFormData(e.node.origin.form);
      }
    }
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
}
