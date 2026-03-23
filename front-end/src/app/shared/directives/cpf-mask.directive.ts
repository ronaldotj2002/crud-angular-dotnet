import { Directive, ElementRef, HostListener, inject } from "@angular/core";


@Directive({
    selector: '[cpfMask]'
})

export class CpfMaskDirective {

    private el = inject(ElementRef);

    @HostListener('input', ['$event'])
    onInput(event: Event) {
        let value = this.el.nativeElement.value;
        value = value.replace(/\D/g, '').slice(0, 11);

        value = value
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        this.el.nativeElement.value = value;
    }
}