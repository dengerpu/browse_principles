/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * 每个歌词对象：{time:开始时间, words: 歌词内容}
 */
function parseLrc() {
    let lines = lrc.split('\n');
    const result = [];
    lines.forEach(item => {
        let pattern = item.split(']');
        let obj = {
            time: parseTime(pattern[0].substring(1)),
            words: pattern[1]
        };
        result.push(obj);
    })
    return result;
}
/***
 * 将时间字符串解析为数字(秒)
 * @param {String} timeStr 时间字符串
 */
function parseTime(timeStr) {
    let parts = timeStr.split(":")
    return +parts[0] * 60 + +parts[1]
}

const lrcData = parseLrc();

// 获取需要的Dom
const doms = {
    audio: document.querySelector('audio'),
    ul: document.querySelector('.list'),
    container: document.querySelector('.container')
}

/**
 * 找到对应的歌词
 * @returns 
 */
function findIndex() {
    // 播放器当前时间
    let curTime = doms.audio.currentTime;
    for(let i = 0; i < lrcData.length; i++) {
        if(curTime < lrcData[i].time) {
            return i - 1;
        }
    }
    // 找遍了都没找到（说明播放到最后一句）
    return lrcData.length - 1;
}
console.log(lrcData)
function createLrcElement() {
    // 创建文档片段
    let frg = document.createDocumentFragment();
    for(let i = 0; i < lrcData.length; i++) {
        let li = document.createElement('li');
        li.textContent = lrcData[i].words;
        frg.appendChild(li)
    }
    doms.ul.appendChild(frg);
}
createLrcElement()

// 容器高度
const containerHeight = doms.container.clientHeight;
// li高度
const liHeight= doms.ul.children[0].clientHeight;
// 最大偏移量
const maxOffset = doms.ul.clientHeight - containerHeight;

// 设置ul元素的偏移量
function setOffset() {
    let index = findIndex()
    console.log(index)
    // 索引本来就比自身值少1
    let offset = liHeight * index + liHeight / 2 - containerHeight / 2;
    if(offset < 0) {
        offset = 0;
    }
    if(offset > maxOffset) {
        offset = maxOffset;
    }
    doms.ul.style.transform = `translateY(-${offset}px)`;
    // 去掉之前的active样式
    let li = doms.ul.querySelector('.active')
    if(li) {
        li.classList.remove('active')
    }
    li = doms.ul.children[index];
    if(li) {
        li.classList.add('active');
    }
}
doms.audio.addEventListener('timeupdate', setOffset);
