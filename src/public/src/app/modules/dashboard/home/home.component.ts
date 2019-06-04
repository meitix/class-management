import { Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-home-cmp',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    ngOnInit() {
        // $('[data-toggle="checkbox"]').each(function () {
        //     if($(this).data('toggle') == 'switch') return;
        //
        //     var $checkbox = $(this);
        //     $checkbox.checkbox();
        // });
    }
}
