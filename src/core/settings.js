import Rx from 'rx'
let fromEvent = Rx.Observable.fromEvent
let Observable = Rx.Observable
let merge = Rx.Observable.merge
import combineTemplate from 'rx.observable.combinetemplate'
import {makeModel, mergeData} from '../utils/modelUtils'


 function remapStructure(input){
  console.log("remapStructure",input)
    if(input.showGrid !==undefined ) return {grid:{show:input.showGrid}}
    if(input.showAnnot !==undefined ) return {annotations:{show:input.showAnnot}}
    if(input.autoRotate !==undefined ) return {camera:{autoRotate:input.autoRotate}}

    if(input.appMode !==undefined ) return {mode:input.appMode}
    if(input.setActiveTool !== undefined) return {activeTool:input.activeTool}

    return input
}

function changeSetting(state, input){
  //console.log("currentData",state,input)
  let output = mergeData(state,remapStructure(input) )
  return output
}

function settings(actions, source){
  ///defaults, what else ?
  const defaults = {
    webglEnabled:true,
    mode:"editor",
    autoSelectNewEntities:true,
    activeTool:undefined,
    repeatTool:false,

    selections: undefined,

    //these are "domain specific", there should be a way for sub systems
    //to "hook up" to the main data storage
    camera:{
      autoRotate:false
    },
    grid:{
      show:true
    },
    annotations:{
      show:true
    }
  }

  let updateFns  = {changeSetting}
  return makeModel(defaults, updateFns, actions, source)
}

export default settings