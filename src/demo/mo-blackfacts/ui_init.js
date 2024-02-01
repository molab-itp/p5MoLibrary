//
function ui_init() {
  if (my.isPortraitView) {
    create_tall_view();
  } else {
    create_wide_view();
  }
}

function create_tall_view() {
  // PortraitView - no qrcode, show dashboard
  //
  id_message_pane.classList.add('hidden');
  qrcode_hide();
  {
    let rects = id_blackfacts_num.getClientRects();
    let rt = rects[0];
    console.log('id_blackfacts_num rt', rt);
    // let y = rt.y + rt.height;
    // let y = 200;
    // id_player.style.top = y + 'px';
  }
  create_index_buttons();
}

function create_wide_view() {
  // Landscape - show qrcode, hide dashboard
  //
  id_dashboard.classList.add('hidden');
  {
    // place qrcode image at top right
    let x = window.innerWidth - id_qrcode.clientWidth;
    let y = window.innerHeight - id_qrcode.clientHeight;
    id_qrcode.style.left = x + 'px';
    // id_qrcode.style.top = y + 'px';
  }
}

function create_index_buttons() {
  //
  // let button_host = window.id_button_host;
  let button_host = id_dashboard;
  for (let index = 0; index < nfacts; index++) {
    let label = ('' + (index + 1)).padStart(3, '0');
    const elt = document.createElement('button');
    elt.innerHTML = label;
    button_host.appendChild(elt);
    elt.addEventListener('click', function () {
      dstore_blackfacts_update({ index });
    });
  }
}

function qrcode_hide() {
  id_qrcode.classList.add('hidden');
}

function qrcode_show() {
  id_qrcode.classList.remove('hidden');
}
