import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) { return []; }
        if (!searchText) { return items; }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return (it.lead.includes(searchText)
            || it.nome.toLowerCase().includes(searchText)
            || it.nif.includes(searchText)
            || it.email.toLowerCase().includes(searchText)
            || it.status.toLowerCase().includes(searchText));
        });
    }
}
