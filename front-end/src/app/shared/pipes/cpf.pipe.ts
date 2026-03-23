import { Pipe, PipeTransform } from "@angular/core";



@Pipe({
    name: 'cpf'
})

export class CpfPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return '';

        value = value.replace(/\D/g, '');

        return value 
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    
}