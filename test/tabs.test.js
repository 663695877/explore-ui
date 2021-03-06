const expect = chai.expect
import Vue from 'vue'
import Tabs from '../src/tab/tabs'
import TabsHead from '../src/tab/tabs-head'
import TabsBody from '../src/tab/tabs-body'
import TabsTitle from '../src/tab/tabs-title'
import TabsContent from '../src/tab/tabs-content'

Vue.component('c-tabs', Tabs)
Vue.component('c-tabs-head', TabsHead)
Vue.component('c-tabs-body', TabsBody)
Vue.component('c-tabs-title', TabsTitle)
Vue.component('c-tabs-content', TabsContent)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Tabs', () => {

    it('存在', () => {
        expect(Tabs).to.exist
    })

    it('子组件只能是 tabs-head 和 tabs-body', () => {
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <c-tabs selected="fianace">
                <c-tabs-head>
                    <c-tabs-item name="woman"> 美女 </c-tabs-item>
                    <c-tabs-item name="finance"> 财经 </c-tabs-item>
                    <c-tabs-item name="sports"> 体育 </c-tabs-item>
                </c-tabs-head>
                <c-tabs-body>
                    <c-tabs-pane name="woman"> 美女相关资讯 </c-tabs-item>
                    <c-tabs-pane name="finance"> 财经相关资讯 </c-tabs-item>
                    <c-tabs-pane name="sports"> 体育相关资讯 </c-tabs-item>
                </c-tabs-body>
            </c-tabs>
        `
        let vm = new Vue({
            el: div
        })
        vm.$nextTick(() => {
            let x = vm.$el.querySelector(`.tabs-item[data-name="finance"]`)
            expect(x.classList.contains('active')).to.be.true
        })
    })
})
