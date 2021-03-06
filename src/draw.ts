declare var require: any;
let _ = require('lodash');

import { Map } from './map';
import { Character } from './character';
import { Camera } from './camera';
import { TilesInView } from './game';

export function character(character: Character, camera: Camera, context: any): void {
    // assume the character should be centered
    let screenX: number = character.centerPosition.x;
    let screenY: number = character.centerPosition.y;
    if (character.is.leftOfCenter) {
        screenX = character.x;
    };
    if (character.is.rightOfCenter) {
        // character's max screenX - character's distance from the map's right edge
        screenX = (camera.width - character.width) - (character.maxX - character.x);
    }
    if (character.is.upOfCenter) {
        screenY = character.y;
    }
    if (character.is.downOfCenter) {
        // character's max screenY - character's distance from the map's bottom edge
        screenY = (camera.height - character.height) - (character.maxY - character.y);
    }

    context.drawImage(
        character.image,
        _.round(screenX),
        _.round(screenY),
        character.width,
        character.height
    );
}

export function layer(context: any, tiles: TilesInView, map: Map, layer: number, offsetX: number, offsetY: number): void {
    _.each(_.range(tiles.startRow, tiles.endRow + 1), (row: number) => {
        _.each(_.range(tiles.startCol, tiles.endCol + 1), (col: number) => {
            let tile = map.layers[layer][row][col];
            if (tile !== 0) {
                let source = map.spriteSheet[tile];
                let destX = ((col - tiles.startCol) * map.tileWidth) + offsetX;
                let destY = ((row - tiles.startRow) * map.tileHeight) + offsetY;
                context.drawImage(
                    map.spriteSheet.image,
                    source.x,
                    source.y,
                    source.width,
                    source.height,
                    _.round(destX),
                    _.round(destY),
                    map.tileWidth,
                    map.tileHeight
                )
            }
        })
    })
}
