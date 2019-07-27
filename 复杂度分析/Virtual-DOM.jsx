/* @jsx h*/
<ul class="list">
	<li>item1</li>
	<li>item2</li>
</ul>

{type: 'ul',props:{ class:"list"},
	children: [
	{type: 'li',props:{},children: ["item1"]},
	{type: 'li',props: {},children: ["item2"]}
	]
}

function h(type,props,...children) {
	return {type,props,children}
}

h('ul',{class:"list"},
	h('li',null,"item1"),
	h('li',null,"item2")
)
const a = (h('ul',{class: 'list'},h('li',null,'item1'),h('li',null,'item2')))


function createElement(node) {
	if (typeof node === 'string') {
		return document.createTextNode(node)
	}
	const $el = document.createElement(node.type)
	node.children
		.map(createElement)
		.forEach($el.appendChild.bind(this))
	return $el
}

{type: 'ul',props:{ class:"list"},
	children: [
	{type: 'li',props:{},children: ["item1"]},
	{type: 'li',props: {},children: ["item2"]}
	]
}
//怎么把对象变成真正的DOM，那得操作DOM的API

// 推理，得有前提条件吧
// $parent newNode, oldNode代表什么
// 这将要比较两个虚拟树，一个新的和一个老的
// 两个虚拟树比较完后，再操作真实的DOM
// 增删改节点
function updateElement($parent, newNode, oldNode, index = 0) {
	// 判断两个树，新树有没有老节点，那么在真实DOM里增加新节点
	if (!oldNode) {
		$parent.appendChild(
			createElement(newNode)
		);
	//比较两个树，新树没有新节点，那么在真实DOM就移除老节点
	} else if (!newNode) {
		$parent.removeChild(
			$parent.childNodes[index]
		)
	} else if(changed(newNode, oldNode)) {
		$parent.replaceChild(
			createElement(newNode),
			$parent.childNodes[index]
		)
	} else if (newNode.type){
		const newLength = newNode.children.length;
		const oldLength = oldNode.children.length;
		for (let i=0; i< newLength || i < oldLength; i++) {
			updateElement(
				$parent.childNodes[index],
				newNode.children[i],
				oldNode.children[i],
				i
			)
		}
	}
}


function changed(node1,node2) {
	return typeof node1 !== typeof node2
	|| typeof node1 === 'string' 
	&& node1 !== node2 
	|| node1.type !== node2.type
}


