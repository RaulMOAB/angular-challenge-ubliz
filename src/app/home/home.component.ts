import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  code = JSON.stringify(
    [
      {
        code: "123123123",
        name: "Book1",
      },
      {
        code: "123456789",
        name: "Book2",
      },
      {
        code: "789456123",
        name: "Book3",
      },
      {
        code: "456123789",
        name: "Book4",
      },
    ],
    undefined,
    2
  );
  constructor() {}

  ngOnInit() {}
}
