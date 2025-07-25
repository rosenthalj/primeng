import { Code } from '@/domain/code';
import { Customer } from '@/domain/customer';
import { CustomerService } from '@/service/customerservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'subheader-grouping-doc',
    standalone: false,
    template: ` <app-docsectiontext>
            <p>
                Rows are grouped with the <i>groupRowsBy</i> property. When <i>rowGroupMode</i> is set as <i>subheader</i>, a header and footer can be displayed for each group. The content of a group header is provided with <i>groupheader</i> and
                footer with <i>groupfooter</i> templates.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="customers" sortField="representative.name" sortMode="single" [scrollable]="true" scrollHeight="400px" rowGroupMode="subheader" groupRowsBy="representative.name" [tableStyle]="{ 'min-width': '60rem' }">
                    <ng-template #header>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </ng-template>
                    <ng-template #groupheader let-customer>
                        <tr pRowGroupHeader>
                            <td colspan="5">
                                <div class="flex items-center gap-2">
                                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                                    <span class="font-bold">{{ customer.representative.name }}</span>
                                </div>
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template #groupfooter let-customer>
                        <tr>
                            <td colspan="5">
                                <div class="text-right font-bold pe-12">Total Customers: {{ calculateCustomerTotal(customer.representative.name) }}</div>
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template #body let-customer let-rowIndex="rowIndex">
                        <tr>
                            <td>
                                {{ customer.name }}
                            </td>
                            <td>
                                <div class="flex items-center gap-2">
                                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                                    <span>{{ customer.country.name }}</span>
                                </div>
                            </td>
                            <td>
                                {{ customer.company }}
                            </td>
                            <td>
                                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                            </td>
                            <td>
                                {{ customer.date }}
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-subheader-grouping-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubheaderGroupingDoc {
    customers!: Customer[];

    constructor(
        private customerService: CustomerService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
            this.cd.markForCheck();
        });
    }

    calculateCustomerTotal(name: string) {
        let total = 0;

        if (this.customers) {
            for (let customer of this.customers) {
                if (customer.representative?.name === name) {
                    total++;
                }
            }
        }

        return total;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warn';

            case 'renewal':
                return null;
        }
    }

    code: Code = {
        basic: `<p-table [value]="customers" sortField="representative.name" sortMode="single" [scrollable]="true" scrollHeight="400px" rowGroupMode="subheader" groupRowsBy="representative.name" [tableStyle]="{'min-width': '60rem'}">
    <ng-template #header>
        <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Company</th>
            <th>Status</th>
            <th>Date</th>
        </tr>
    </ng-template>
    <ng-template #groupheader let-customer>
        <tr pRowGroupHeader>
            <td colspan="5">
                <div class="flex items-center gap-2">
                    <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                    <span class="font-bold">{{ customer.representative.name }}</span>
                </div>
            </td>
        </tr>
    </ng-template>
   <ng-template #groupfooter let-customer>
        <tr>
            <td colspan="5">
                <div class="text-right font-bold pe-12">Total Customers: {{ calculateCustomerTotal(customer.representative.name) }}</div>
            </td>
        </tr>
    </ng-template>
    <ng-template #body let-customer let-rowIndex="rowIndex">
        <tr>
            <td>
                {{customer.name}}
            </td>
            <td>
                <div class="flex items-center gap-2">
                    <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                    <span>{{ customer.country.name }}</span>
                </div>
            </td>
            <td>
                {{customer.company}}
            </td>
            <td>
                <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
            </td>
            <td>
                {{customer.date}}
            </td>
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table [value]="customers" sortField="representative.name" sortMode="single" [scrollable]="true" scrollHeight="400px" rowGroupMode="subheader" groupRowsBy="representative.name" [tableStyle]="{'min-width': '60rem'}">
        <ng-template #header>
            <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Company</th>
                <th>Status</th>
                <th>Date</th>
            </tr>
        </ng-template>
        <ng-template #groupheader let-customer>
            <tr pRowGroupHeader>
                <td colspan="5">
                        <div class="flex items-center gap-2">
                        <img [alt]="customer.representative.name" src="https://primefaces.org/cdn/primeng/images/demo/avatar/{{ customer.representative.image }}" width="32" style="vertical-align: middle" />
                        <span class="font-bold">{{ customer.representative.name }}</span>
                    </div>
                </td>
            </tr>
        </ng-template>
        <ng-template #groupfooter let-customer>
            <tr>
                <td colspan="5">
                    <div class="text-right font-bold">Total Customers: {{ calculateCustomerTotal(customer.representative.name) }}</div>
                </td>
            </tr>
        </ng-template>
        <ng-template #body let-customer let-rowIndex="rowIndex">
            <tr>
                <td>
                    {{customer.name}}
                </td>
                <td>
                    <div class="flex items-center gap-2 pe-12">
                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + customer.country.code" style="width: 20px" />
                        <span>{{ customer.country.name }}</span>
                    </div>
                </td>
                <td>
                    {{customer.company}}
                </td>
                <td>
                    <p-tag [value]="customer.status" [severity]="getSeverity(customer.status)" />
                </td>
                <td>
                    {{customer.date}}
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Customer } from '@/domain/customer';
import { CustomerService } from '@/service/customerservice';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { Tag } from 'primeng/tag';

@Component({
    selector: 'table-subheader-grouping-demo',
    templateUrl: 'table-subheader-grouping-demo.html',
    standalone: true,
    imports: [TableModule, HttpClientModule, Tag],
    providers: [CustomerService]
})
export class TableSubheaderGroupingDemo implements OnInit{
    customers!: Customer[];

    constructor(private customerService: CustomerService) {}

    ngOnInit() {
        this.customerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    }

    calculateCustomerTotal(name: string) {
        let total = 0;

        if (this.customers) {
            for (let customer of this.customers) {
                if (customer.representative?.name === name) {
                    total++;
                }
            }
        }

        return total;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warn';

            case 'renewal':
                return null;
        }
    }
}`,
        data: `{
    id: 1000,
    name: 'James Butt',
    country: {
        name: 'Algeria',
        code: 'dz'
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png'
    },
    balance: 70663
},
...`,
        service: ['CustomerService']
    };

    extFiles = [
        {
            path: 'src/domain/customer.ts',
            content: `
export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: number;
}`
        }
    ];
}
