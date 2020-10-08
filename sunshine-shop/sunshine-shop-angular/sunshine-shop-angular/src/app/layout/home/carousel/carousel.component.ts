import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  // slidesStore = [
  //   {
  //     id:1,
  //     src:'../../../assets/carousel/1.jpeg',
  //     alt:'Image_1',
  //     title:'Image_1'
  //   },
  //   {
  //     id:2,
  //     src:'../../../assets/carousel/2.jpeg',
  //     alt:'Image_2',
  //     title:'Image_3'
  //   },
  //   {
  //     id:3,
  //     src:'../../../assets/carousel/3.jpeg',
  //     alt:'Image_3',
  //     title:'Image_3'
  //   },
  //   {
  //     id:4,
  //     src:'../../../assets/carousel/4.jpeg',
  //     alt:'Image_4',
  //     title:'Image_4'
  //   },
  //   {
  //     id:5,
  //     src:'../../../assets/carousel/5.jpeg',
  //     alt:'Image_5',
  //     title:'Image_5'
  //   }
  // ]


  constructor() { }

  ngOnInit(): void {
  }
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 300,
    navText: ['', ''],
    items: 1,
    nav: false
  }

}
