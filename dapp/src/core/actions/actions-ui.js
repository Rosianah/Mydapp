import constants from 'core/types'

//redux thunk to delay the dispatch of a function till you to do simething firts


//export function openModal(obj) {
  //return (dispatch) => {
    //setTimeout (() => {
      //dispatch((() => {
        //return {
          //type: constants.OPEN_MODAL,
          //modalKey: obj.modalKey
       // }
     // } )())
   // }, 3000)
  //}
//}


//actions taht are called
export function openModal(obj) {
  return {
    type: constants.OPEN_MODAL,
    modalKey: obj.modalKey
  }
}

export function openConfirmModal(obj) {
  return {
    type: constants.OPEN_CONFIRM_MODAL,
    modalKey: obj.modalKey
  }
}

export function closeModal() {
  return {
    type: constants.CLOSE_MODAL
  }
}

export function closeConfirmModal() {
  return {
    type: constants.CLOSE_CONFIRM_MODAL
  }
}

export function openRightDrawer() {
  return {
    type: constants.OPEN_RIGHT_DRAWER
  }
}

export function closeRightDrawer() {
  return {
    type: constants.CLOSE_RIGHT_DRAWER
  }
}
