import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class App {

  // 存储实例
  static #instance = undefined
  // 根节点DOM
  #rootDom = undefined
  // 渲染器
  #renderer = undefined
  get renderer() {
    return this.#renderer
  }
  // 场景
  #scene = undefined
  get scene() {
    return this.#scene
  }
  // 摄像
  #camera = undefined
  get camera() {
    return this.#camera
  }
  // 摄像机控制器
  #control = undefined
  get control () {
    return this.#control
  }

  // 背景颜色
  #backgroundColor = undefined
  get backgroundColor () {
    return this.#backgroundColor
  }
  set backgroundColor (color) {
    this.#sceneSetBackground(color)
  }
  // resize事件
  #resizeHandler = undefined
  // 创建根节点DOM
  #createRootDom = () => document.querySelector('#app')
  // 创建渲染器
  #createRenderer = () => new THREE.WebGLRenderer({ antialias: true })// 抗锯齿
  // 创建场景
  #createScene = () => new THREE.Scene()
  // 创建摄像机
  #createCamera = () => new THREE.PerspectiveCamera(
    75,
    this.#getWindowAspectRatio(),
    0.1,
    1000
  )
  // 创建摄像机控制器
  #createCameraControls = () => new OrbitControls(this.#camera, this.#renderer.domElement)
  // 获取窗口宽高比
  #getWindowAspectRatio = () => window.innerWidth / window.innerHeight
  // 设置像素比
  #rendererSetPixelRatio = () => this.#renderer.setPixelRatio(window.devicePixelRatio)
  // 设置渲染器大小
  #rendererSetSize = () => this.#renderer.setSize(window.innerWidth, window.innerHeight)
  // 添加渲染器到DOM
  #rendererDomAppend = () => this.#rootDom?.appendChild(this.#renderer.domElement)
  // 设置摄像机位置
  #cameraSetPosition = () => this.#camera.position.z = 100
  // 设置场景背景
  #sceneSetBackground = (color) => {
    this.#scene.background = color ?
      new THREE.Color(color) :
      new THREE.Color(0x000000)
    this.#backgroundColor = this.#scene.background.getStyle()
  }
  get sceneSetBackground() {
    return this.#sceneSetBackground
  }
  // 窗口大小改变时更新渲染器
  #rendererResizeUpdate = () => {
    // 更新渲染器大小
    this.#rendererSetSize()
  }
  // 使用键盘WSAD控制
  #controlAddKeyControl = () => {
    this.#control.listenToKeyEvents(window)
    this.#control.keys = {
      LEFT: 'KeyD',
      UP: 'KeyS',
      RIGHT: 'KeyA',
      BOTTOM: 'KeyW'
    }
  }


  // 窗口大小改变时更新摄像机
  #cameraResizeUpdate = () => {
    //更新摄像机宽高比
    this.#camera.aspect = this.#getWindowAspectRatio()
    // 更新摄像机投影矩阵
    this.#camera.updateProjectionMatrix()
  }
  // 创建关键资源
  #create = () => {
    console.log('App create');
    this.#rootDom = this.#createRootDom()
    this.#renderer = this.#createRenderer()
    this.#scene = this.#createScene()
    this.#camera = this.#createCamera()
    this.#control = this.#createCameraControls()
  }
  // 设置关键信息
  #setting = () => {
    console.log('App setting');
    this.#rendererSetPixelRatio() // 设置像素比
    this.#rendererSetSize() // 设置渲染器大小
    this.#rendererDomAppend() // 添加渲染器到DOM
    this.#cameraSetPosition() // 设置摄像机位置
    this.#sceneSetBackground(0x50316e) // 设置场景背景 
    this.#sceneSetBackground(0xdddddd) // 设置场景背景 
    this.#controlAddKeyControl()// 加入键盘控制
  }
  get setting() {
    return this.#setting
  }
  // 更新关键事件
  #update = () => {
    console.log('App update');
    this.#resizeHandler = () => {
      // 窗口大小改变时更新渲染器
      this.#rendererResizeUpdate()
      // 窗口大小改变时更新摄像机
      this.#cameraResizeUpdate()
    }
    window.addEventListener('resize', this.#resizeHandler)
  }
  // 加载动画渲染
  #animate = () => {
    console.log('App animate');
    requestAnimationFrame(this.#animate)
    this.#render()
  }
  // 渲染
  #render = () => {
    this.#control.update()
    this.#renderer.render(this.#scene, this.#camera)
  }
  // 初始化
  #init = () => {
    console.log('App init');
    // 创建关键资源
    this.#create()
    // 设置关键信息
    this.#setting()
    // 更新关键事件
    this.#update()
    // 加载动画渲染
    this.#animate()
  }
  // 判断是否为单一模式
  #isSignalInstance = () => {
    if(App.#instance){
      return false
    }
    App.#instance = this
    return true
  }
  constructor() {
    if(!this.#isSignalInstance()) return App.#instance
    
    this.#init()
  }
}