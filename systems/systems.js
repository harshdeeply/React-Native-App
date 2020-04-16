var moved = false;
const DELTA_MINIUMUM = 10

const getRandomKey = () => Math.floor(Math.random() * Math.floor(10000));

const Move = (entities, {touches}) => {
    if (entities[18].direction) {
        entities[18].previousDirection = entities[18].direction;
    }
    
    if (touches[0] != undefined) {
        if (touches[0].type == "move") {
            if (touches[0].delta.pageX > DELTA_MINIUMUM && moved == false) {
                moved = true;
                moveRight(entities);
                entities[18].direction = 3;
                entities[18].usekey = getRandomKey();
                setTimeout(function () {
                    moved = false
                }, 700)
            }
            if (touches[0].delta.pageX < -DELTA_MINIUMUM && moved == false) {
                moved = true;
                moveLeft(entities);
                entities[18].direction = 2;
                entities[18].usekey = getRandomKey();
                setTimeout(function () {
                    moved = false
                }, 700)
            }
            if (touches[0].delta.pageY < -DELTA_MINIUMUM && moved == false) {
                moved = true;
                moveTop(entities);
                entities[18].direction = 0;
                entities[18].usekey = getRandomKey();
                setTimeout(function () {
                    moved = false
                }, 700)
            }
            if (touches[0].delta.pageY > DELTA_MINIUMUM && moved == false) {
                moved = true;
                moveBottom(entities);
                entities[18].direction = 1;
                entities[18].usekey = getRandomKey();
                setTimeout(function () {
                    moved = false
                }, 700)
            }
        }
        if (touches[0].type == 'end'){
            moveInwards(entities);
            entities[18].direction = 4;
            entities[18].usekey = getRandomKey();
        }
    }
    return entities;
};

function moveTop(entities) {
    mergeFourthRim(entities[4], entities[3], entities[2], entities[1], entities[17]);
    mergeFourthRim(entities[5], entities[6], entities[7], entities[8], entities[17]);
    mergeThirdSecondRim(entities[10], entities[9], entities[17]);
    mergeThirdSecondRim(entities[11], entities[12], entities[17]);
    addRandom(entities);
}

function moveBottom(entities) {
    mergeFourthRim(entities[1], entities[2], entities[3], entities[4], entities[17]);
    mergeFourthRim(entities[8], entities[7], entities[6], entities[5], entities[17]);
    mergeThirdSecondRim(entities[9], entities[10], entities[17]);
    mergeThirdSecondRim(entities[12], entities[11], entities[17]);
    addRandom(entities);
}

function moveRight(entities) {
    mergeFourthRim(entities[7], entities[8], entities[1], entities[2], entities[17]);
    mergeFourthRim(entities[6], entities[5], entities[4], entities[3], entities[17]);
    mergeThirdSecondRim(entities[12], entities[9], entities[17]);
    mergeThirdSecondRim(entities[11], entities[10], entities[17]);
    mergeThirdSecondRim(entities[14], entities[13], entities[17]);
    addRandom(entities);
}

function moveLeft(entities) {
    mergeFourthRim(entities[2], entities[1], entities[8], entities[7], entities[17]);
    mergeFourthRim(entities[3], entities[4], entities[5], entities[6], entities[17]);
    mergeThirdSecondRim(entities[9], entities[12], entities[17]);
    mergeThirdSecondRim(entities[10], entities[11], entities[17]);
    mergeThirdSecondRim(entities[13], entities[14], entities[17]);
    addRandom(entities);
}

function moveInwards(entities) {
    mergeInwards(entities[9], entities[1], entities[2], entities[17]);
    mergeInwards(entities[10], entities[3], entities[4], entities[17]);
    mergeInwards(entities[11], entities[5], entities[6], entities[17]);
    mergeInwards(entities[12], entities[7], entities[8], entities[17]);
    mergeInwards(entities[13], entities[9], entities[10], entities[17]);
    mergeInwards(entities[14], entities[11], entities[12], entities[17]);
    mergeInwards(entities[15], entities[13], entities[14], entities[17]);
    addRandom(entities);
}

function mergeInwards(entityInner, entityOuter1, entityOuter2, score) {
    var outerSum = entityOuter1.value + entityOuter2.value;
    
    entityInner.previousValue = entityInner.value;
    entityOuter1.previousValue = entityOuter1.value;
    entityOuter1.previousValue = entityOuter1.value;
    entityInner.pulse = false;
    entityOuter1.pulse = false;
    entityOuter2.pulse = false;
    
    if (entityOuter1.value == entityOuter2.value && entityOuter1.value != 0) {
        if (entityInner.value == outerSum || entityInner.value == 0) {
            entityInner.value += outerSum;
            entityOuter1.value = 0;
            entityOuter2.value = 0;
        } else if (entityInner.value == entityOuter1.value) {
            if (Math.floor(Math.random() * Math.floor(2)) == 0) {
                entityInner.value += entityOuter1.value;
                entityOuter1.value = 0;
                scored(score, entityInner.value)
            } else {
                entityInner.value += entityOuter2.value;
                entityOuter2.value = 0;
                scored(score, entityInner.value)
            }
        }
    } else if (entityOuter1.value != entityOuter2.value) {
        if (entityInner.value == 0) {
            if (entityOuter1.value > entityOuter2) {
                entityInner.value = entityOuter1.value;
                entityOuter1.value = 0;
            } else {
                entityInner.value = entityOuter2.value;
                entityOuter2.value = 0;
            }
        } else if (entityInner.value == entityOuter1.value) {
            entityInner.value += entityOuter1.value;
            entityOuter1.value = 0;
            scored(score, entityInner.value)
        } else if (entityInner.value == entityOuter2.value) {
            entityInner.value += entityOuter2.value;
            entityOuter2.value = 0;
            scored(score, entityInner.value)
        }
    }
    
    if (entityInner.previousValue != entityInner.value) entityInner.pulse = true;
    if (entityOuter1.previousValue != entityOuter1.value) entityOuter1.pulse = true;
    if (entityOuter2.previousValue != entityOuter2.value) entityOuter2.pulse = true;
}

function mergeThirdSecondRim(entity1, entity2, score) {
    var scoredBool = false;
    
    entity1.previousValue = entity1.value;
    entity2.previousValue = entity2.value;
    entity1.pulse = false;
    entity2.pulse = false;
    
    if (entity1.value == entity2.value || entity2.value == 0) {
        if (entity2.value != 0) {
            scoredBool = true;
        }
        entity2.value += entity1.value;
        if (scoredBool == true) {
            scored(score, entity2.value);
        }
        entity1.value = 0;
    }
    
    if (entity1.previousValue != entity1.value) entity1.pulse = true;
    if (entity2.previousValue != entity2.value) entity2.pulse = true;
}

function mergeFourthRim(entity1, entity2, entity3, entity4, score) {
    var merged23 = false;
    var scoredBool = false;
    
    entity1.previousValue = entity1.value;
    entity2.previousValue = entity2.value;
    entity3.previousValue = entity3.value;
    entity4.previousValue = entity4.value;
    entity1.pulse = false;
    entity2.pulse = false;
    entity3.pulse = false;
    entity4.pulse = false;
    
    if (entity4.value == 0 || entity3.value == entity4.value) {
        if (entity4.value != 0) {
            scoredBool = true;
        }
        entity4.value += entity3.value;
        if (scoredBool == true) {
            scored(score, entity4.value);
        }
        entity3.value = 0;
    }
    if (entity3.value == 0 || entity2.value == entity3.value) {
        if (entity3.value == 0) {
            entity3.value += entity2.value;
            entity2.value = 0;
            if (entity4.value == 0 || entity3.value == entity4.value) {
                if (entity4.value != 0) {
                    scoredBool = true;
                }
                entity4.value += entity3.value;
                if (scoredBool == true) {
                    scored(score, entity4.value);
                }
                entity3.value = 0;
            }
        } else if (entity2.value == entity3.value) {
            entity3.value += entity2.value;
            entity2.value = 0;
            merged23 = true;
            scored(score, entity3.value);
            if (entity4.value == 0) {
                entity4.value += entity3.value;
                entity3.value = 0;
                merged23 = false;
            }

        }
    }
    if (entity2.value == 0 || entity1.value == entity2.value) {
        if (entity2.value == 0) {
            entity2.value = entity1.value;
            entity1.value = 0;
            if (entity3.value == 0 || entity2.value == entity3.value && merged23 == false) {
                if (entity3.value == 0) {
                    entity3.value += entity2.value;
                    entity2.value = 0;
                    if (entity4.value == 0 || entity3.value == entity4.value) {
                        if (entity4.value != 0) {
                            scoredBool = true;
                        }
                        entity4.value += entity3.value;
                        if (scoredBool == true) {
                            scored(score, entity4.value);
                        }
                        entity3.value = 0;
                    }
                } else if (entity2.value == entity3.value) {
                    entity3.value += entity2.value;
                    entity2.value = 0;
                    scored(score, entity3.value);
                    if (entity4.value == 0) {
                        entity4.value += entity3.value;
                        entity3.value = 0;
                    }
                }
            }
        } else if (entity1.value == entity2.value) {
            entity2.value += entity1.value;
            entity1.value = 0;
            scored(score, entity2.value);
            if (entity3.value == 0) {
                entity3.value = entity2.value;
                entity2.value = 0;
                if (entity4.value == 0) {
                    entity4.value += entity3.value;
                    entity3.value = 0;
                }
            }
        }
    }
    
    if (entity1.previousValue != entity1.value) entity1.pulse = true;
    if (entity2.previousValue != entity2.value) entity2.pulse = true;
    if (entity3.previousValue != entity3.value) entity3.pulse = true;
    if (entity4.previousValue != entity4.value) entity4.pulse = true;
}

function scored(score, value) {
    score.value += value;
}

function addRandom(entities) {
    var arrayOfEmpties = [];
    var newVariable;
    for (var i = 1; i < 16; i++){
        if (entities[i].value == 0){
            arrayOfEmpties.push(i);
        }
    }
    if (Math.floor(Math.random() * Math.floor(2)) == 0){
        newVariable = 4;
    } else {
        newVariable = 2;
    }
    if (entities[arrayOfEmpties[Math.floor(Math.random() * Math.floor(arrayOfEmpties.length))]] == undefined){
        entities[18].gameLost = true;
        return;
    }
    entities[arrayOfEmpties[Math.floor(Math.random() * Math.floor(arrayOfEmpties.length))]].value = newVariable;
}

export {Move};
