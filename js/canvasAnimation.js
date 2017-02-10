GRADIENT_COLOR_1 = '#65a7f7'
GRADIENT_COLOR_2 = '#2989D8'
GRADIENT_COLOR_3 = GRADIENT_COLOR_1

BUBBLES_LENGTH = 10

BUBBLE_VY_MIN = 0.1
BUBBLE_VY_MAX = 2

BUBBLE_RADIUS_MIN = 1
BUBBLE_RADIUS_MAX = 100

BUBBLE_ALPHA_MAX = 0.25

createjs.Ticker.framerate = 30


getRandomArbitary = (min, max) ->
  return Math.random() * (max - min) + min

getRandomInt = (min, max) ->
  return Math.floor( Math.random() * (max - min + 1) ) + min;




class Main

  constructor: (@stage) ->



    @canvas = @stage.canvas
    @canvas.width  = $(document).width()
    @canvas.height = $(document).height()



    @background = new (createjs.Shape)
    @stage.addChild @background




    @bubbles = []
    for i in [0...BUBBLES_LENGTH]
      bubble = new (createjs.Shape)

      radius = getRandomInt BUBBLE_RADIUS_MIN, BUBBLE_RADIUS_MAX
      bubble.graphics.beginFill("#fff").drawCircle(0, 0, radius)

      bubble.ax  = getRandomInt 0,  @canvas.width
      bubble.ay =  getRandomInt 0,  @canvas.height

      bubble.vy = getRandomArbitary BUBBLE_VY_MIN, BUBBLE_VY_MAX

      bubble.alpha = 0
      @bubbles.push bubble

      @stage.addChild bubble













  run: ->
    @_drawBackground()
    createjs.Ticker.addEventListener "tick", @handleTick.bind @
    console.log " - run"




  handleTick: ->

    for bubble in @bubbles
      bubble.ay  -= bubble.vy
      bubble.alpha = 1 - (Math.abs((bubble.ay / @canvas.height) - 0.5) * 2)
      bubble.alpha *= BUBBLE_ALPHA_MAX

      if bubble.ay <= 0
        bubble.ax = getRandomInt 0,  @canvas.width
        bubble.ay = @canvas.height

        bubble.vy = getRandomArbitary BUBBLE_VY_MIN, BUBBLE_VY_MAX

      bubble.x = Math.floor bubble.ax
      bubble.y = Math.floor bubble.ay

    @stage.update()



  _drawBackground: ->


    @background.graphics
    .beginLinearGradientFill(
      [
        GRADIENT_COLOR_1
        GRADIENT_COLOR_2
        GRADIENT_COLOR_3
      ]
      [
        0
        0.5
        1
      ]
      0, 0, 0, @canvas.height
    )
    .drawRect 0, 0, @canvas.width, @canvas.height

























$(document).ready ->
  
  console.log " - ready"

  stage = new (createjs.Stage)('background')

  main = new Main stage
  main.run()

  return



