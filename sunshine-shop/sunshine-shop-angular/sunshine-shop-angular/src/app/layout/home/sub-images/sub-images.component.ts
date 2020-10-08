import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-images',
  templateUrl: './sub-images.component.html',
  styleUrls: ['./sub-images.component.css']
})
export class SubImagesComponent implements OnInit {
  slidesStore = [
    {
      id:1,
      src:'../../../assets/sub-images/1.jpeg',
      alt:'Image_1',
      title:'Image_1'
    },
    {
      id:2,
      src:'../../../assets/sub-images/2.jpeg',
      alt:'Image_2',
      title:'Image_3'
    },
    {
      id:3,
      src:'../../../assets/sub-images/3.jpeg',
      alt:'Image_3',
      title:'Image_3'
    }]

  constructor() { }

  ngOnInit(): void {
  }

}
