import { Component } from '@angular/core';

@Component({
    selector: 'carousel-accessibility-doc',
    standalone: false,
    template: ` <app-docsectiontext>
        <h3>Screen Reader</h3>
        <p>
            Carousel uses <i>region</i> role and since any attribute is passed to the main container element, attributes such as <i>aria-label</i> and <i>aria-roledescription</i> can be used as well. The slides container has <i>aria-live</i>
            attribute set as "polite" if carousel is not in autoplay mode, otherwise "off" would be the value in autoplay.
        </p>
        <p>
            A slide has a <i>group</i> role with an aria-label that refers to the <i>aria.slideNumber</i> property of the <a href="/configuration/#locale">locale</a> API. Similarly <i>aria.slide</i> is used as the <i>aria-roledescription</i> of the
            item. Inactive slides are hidden from the readers with <i>aria-hidden</i>.
        </p>
        <p>
            Next and Previous navigators are button elements with <i>aria-label</i> attributes referring to the <i>aria.nextPageLabel</i> and <i>aria.firstPageLabel</i> properties of the <a href="/configuration/#locale">locale</a> API by default
            respectively, you may still use your own aria roles and attributes as any valid attribute is passed to the button elements implicitly by using <i>nextButtonProps</i> and <i>prevButtonProps</i>.
        </p>
        <p>Quick navigation elements are button elements with an <i>aria-label</i> attribute referring to the <i>aria.pageLabel</i> of the <a href="/configuration/#locale">locale</a> API. Current page is marked with <i>aria-current</i>.</p>

        <h3>Next/Prev Keyboard Support</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Function</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><i>tab</i></td>
                        <td>Moves focus through interactive elements in the carousel.</td>
                    </tr>
                    <tr>
                        <td><i>enter</i></td>
                        <td>Activates navigation.</td>
                    </tr>
                    <tr>
                        <td><i>space</i></td>
                        <td>Activates navigation.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3>Quick Navigation Keyboard Support</h3>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Function</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><i>tab</i></td>
                        <td>Moves focus through the active slide link.</td>
                    </tr>
                    <tr>
                        <td><i>enter</i></td>
                        <td>Activates the focused slide link.</td>
                    </tr>
                    <tr>
                        <td><i>space</i></td>
                        <td>Activates the focused slide link.</td>
                    </tr>
                    <tr>
                        <td><i>right arrow</i></td>
                        <td>Moves focus to the next slide link.</td>
                    </tr>
                    <tr>
                        <td><i>left arrow</i></td>
                        <td>Moves focus to the previous slide link.</td>
                    </tr>
                    <tr>
                        <td><i>home</i></td>
                        <td>Moves focus to the first slide link.</td>
                    </tr>
                    <tr>
                        <td><i>end</i></td>
                        <td>Moves focus to the last slide link.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </app-docsectiontext>`
})
export class AccessibilityDoc {}
