import { Code } from '@/domain/code';
import { NodeService } from '@/service/nodeservice';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode } from 'primeng/api';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'template-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Custom content at <i>caption</i>, <i>header</i>, <i>body</i> and <i>summary</i> sections are supported via templating.</p>
        </app-docsectiontext>
        <div class="card">
            <p-deferred-demo (load)="loadDemoData()">
                <p-treetable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #caption><div class="text-xl font-bold">File Viewer</div> </ng-template>
                    <ng-template #header let-columns>
                        <tr>
                            <th *ngFor="let col of columns">
                                {{ col.header }}
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
                        <tr [ttRow]="rowNode">
                            <td *ngFor="let col of columns; let i = index; let last = last">
                                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                                {{ rowData[col.field] }}
                                <ng-container *ngIf="last">
                                    <p-button icon="pi pi-search" rounded="true" [style]="{ 'margin-right': '.5em' }" />
                                    <p-button icon="pi pi-pencil" rounded="true" severity="success" />
                                </ng-container>
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template #summary>
                        <div style="text-align:left">
                            <p-button icon="pi pi-refresh" label="Reload" severity="warn" />
                        </div>
                    </ng-template>
                </p-treetable>
            </p-deferred-demo>
        </div>
        <app-code [code]="code" selector="tree-table-template-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateDoc {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    loadDemoData() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: '', header: '' }
        ];
    }
    code: Code = {
        basic: `<p-treetable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
    <ng-template #caption><div class="text-xl font-bold">File Viewer</div> </ng-template>
    <ng-template #header let-columns>
        <tr>
            <th *ngFor="let col of columns">
                {{ col.header }}
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
        <tr [ttRow]="rowNode">
            <td *ngFor="let col of columns; let i = index; let last = last">
                <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                    {{ rowData[col.field] }}
                <ng-container *ngIf="last">
                    <p-button icon="pi pi-search" rounded="true" [style]="{ 'margin-right': '.5em' }" />
                    <p-button icon="pi pi-pencil" rounded="true" severity="success" />
                </ng-container>
            </td>
        </tr>
    </ng-template>
    <ng-template #summary>
        <div style="text-align:left">
            <p-button icon="pi pi-refresh" label="Reload" severity="warn" />
        </div>
    </ng-template>
</p-treetable>`,

        html: `<div class="card">
    <p-treetable [value]="files" [columns]="cols" [scrollable]="true" [tableStyle]="{ 'min-width': '50rem' }">
        <ng-template #caption><div class="text-xl font-bold">File Viewer</div> </ng-template>
        <ng-template #header let-columns>
            <tr>
                <th *ngFor="let col of columns">
                    {{ col.header }}
                </th>
            </tr>
        </ng-template>
        <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
            <tr [ttRow]="rowNode">
                <td *ngFor="let col of columns; let i = index; let last = last">
                    <p-treetable-toggler [rowNode]="rowNode" *ngIf="i === 0" />
                        {{ rowData[col.field] }}
                    <ng-container *ngIf="last">
                        <p-button icon="pi pi-search" rounded="true" [style]="{ 'margin-right': '.5em' }" />
                        <p-button icon="pi pi-pencil" rounded="true" severity="success" />
                    </ng-container>
                </td>
            </tr>
        </ng-template>
        <ng-template #summary>
            <div style="text-align:left">
                <p-button icon="pi pi-refresh" label="Reload" severity="warn" />
            </div>
        </ng-template>
    </p-treetable>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '@/service/nodeservice';
import { ButtonModule } from 'primeng/button';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-template-demo',
    templateUrl: './tree-table-template-demo.html',
    standalone: true,
    imports: [TreeTableModule, ButtonModule, CommonModule],
    providers: [NodeService]
})
export class TreeTableTemplateDemo implements OnInit {
    files!: TreeNode[];

    cols!: Column[];

    constructor(private nodeService: NodeService) {}

    ngOnInit() {
        this.nodeService.getFilesystem().then((files) => (this.files = files));
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: '', header: '' }
        ];
    }
}`,

        service: ['NodeService']
    };
}
