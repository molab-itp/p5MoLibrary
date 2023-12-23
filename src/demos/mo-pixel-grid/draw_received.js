// incrementally draw grid of pixel rects from storage
function draw_received() {
  // console.log('draw_received my.stored_agent', my.stored_agent);
  // let layer = my.layer;
  if (!my.stored_agent) {
    return;
  }
  my.x0 = 0;
  my.y0 = 0;
  // Render my pix first
  if (my.uid) {
    draw_received_uid(my.uid);
  }
  for (let agent_uid in my.stored_agent) {
    // console.log('draw_received ub_uid', agent_uid);
    if (agent_uid != my.uid) {
      draw_received_uid(agent_uid);
    }
  }
}

function draw_received_uid(agent_uid) {
  let agentEnt = my.stored_agent[agent_uid];
  // console.log('draw_received agentEnt', agentEnt);
  if (!agentEnt) return;
  // console.log('draw_received agentEnt', agentEnt);
  let layer = agentEnt.layer;
  if (!layer) return;
  if (my.stored_pixs) {
    let pixs = my.stored_pixs[agent_uid];
    // console.log('agent_uid', agent_uid, 'pixs', pixs);
    if (!pixs) {
      // console.log('agent_uid', agent_uid, 'pixs', pixs);
      return;
    }
    // console.log('agent_uid', agent_uid, 'pix n', pixs.length);
    draw_received_layer(layer, pixs);
  }
  image(layer, my.x0, my.y0);

  my.x0 += my.vwidth;
  if (my.x0 > width) {
    my.x0 = 0;
    my.y0 += my.vheight;
  }
}

function draw_received_layer(layer, pixs) {
  if (!pixs) return;
  // console.log('draw_received_layer pix n', pixs.length);
  let stepPx = floor(my.vheight / pixs.length);
  let innerPx = floor(stepPx * (1 - my.margin));
  more = 1;
  let vyi = 0;
  let vxi = 0;
  while (more) {
    let pix = pixs[vyi];
    if (!pix) {
      console.log('no vyi', vyi);
      vyi = 0;
      break;
    }
    // console.log('pix', pix);
    let item = pix.row[vxi];
    if (!item) {
      // console.log('no vxi', vxi, 'vyi', vyi);
      break;
    }
    // console.log('item', item);
    let colr = item.c;
    if (!colr) {
      // console.log('no colr vxi', vxi, 'vyi', vyi);
      break;
    }
    // console.log('draw_received_layer colr', colr, typeof colr);
    let x = vxi * stepPx;
    let y = vyi * stepPx;
    draw_received_shape(layer, x, y, colr, innerPx);
    vxi += 1;
    if (vxi >= pix.row.length) {
      vxi = 0;
      vyi += 1;
      if (vyi >= pixs.length) {
        more = 0;
        vyi = 0;
      }
    }
  }
  // console.log('1 colr', colr, typeof colr);
}

function draw_received_shape(layer, x, y, colr, innerPx) {
  layer.fill(colr);
  layer.noStroke();
  // console.log('draw_shape my.sub_index', my.sub_index);
  let ww = innerPx;
  let hh = innerPx;
  let ns = my.sub_index % 4;
  if (ns == 0) {
    layer.rect(x, y, ww, hh);
  } else if (ns == 1) {
    layer.ellipse(x + ww / 2, y + hh / 2, ww, hh);
  } else if (ns == 2) {
    // triangle(x1, y1, x2, y2, x3, y3)
    let x1 = x + ww / 2;
    let y1 = y;
    let x2 = x;
    let y2 = y + hh;
    let x3 = x + ww;
    let y3 = y2;
    layer.triangle(x1, y1, x2, y2, x3, y3);
  } else {
    let x1 = x + ww / 2;
    let y1 = y + hh;
    let x2 = x;
    let y2 = y;
    let x3 = x + ww;
    let y3 = y2;
    layer.triangle(x1, y1, x2, y2, x3, y3);
  }
}
