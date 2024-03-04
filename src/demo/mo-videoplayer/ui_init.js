//
function ui_init() {
  show_qrcode_top_right();
  if (params.playlist) {
    // id_message_pane.classList.add('hidden');
    id_dashboard.classList.add('hidden');
    qrcode_hide();
  } else {
    if (my.isRemote) {
      create_tall_view();
    } else {
      create_wide_view();
    }
  }
  if (params.qrcode) {
    console.log('ui_init qrcode', params.qrcode);
    if (params.qrcode != '.') {
      id_qrcode_src.src = '../../qrcode/' + params.qrcode;
    }
    show_qrcode_top_right();
  }
}

function create_tall_view() {
  // PortraitView - no qrcode, show dashboard
  //
  id_message_pane.classList.add('hidden');
  qrcode_hide();
  create_index_buttons();
}

function create_wide_view() {
  // Landscape - show qrcode, hide dashboard
  //
  id_dashboard.classList.add('hidden');
  show_qrcode_top_right();
}

function show_qrcode_top_right() {
  qrcode_show();
  // place qrcode image at top right
  let x = window.innerWidth - id_qrcode.clientWidth;
  let y = window.innerHeight - id_qrcode.clientHeight;
  id_qrcode.style.left = x + 'px';
  // id_qrcode.style.top = y + 'px';
}

function create_index_buttons() {
  // let button_host = window.id_button_host;
  // let button_host = id_dashboard;
  let button_host = id_index_button_container;
  for (let index = 0; index < nfacts; index++) {
    let label = ('' + (index + 1)).padStart(3, '0');
    const elt = document.createElement('button');
    elt.innerHTML = label;
    button_host.appendChild(elt);
    elt.addEventListener('click', function () {
      toggle_365_panes();
      update_blackfacts_index_dbase(index);
    });
  }
}

function qrcode_hide() {
  id_qrcode.classList.add('hidden');
}

function qrcode_show() {
  id_qrcode.classList.remove('hidden');
}
