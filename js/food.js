// 食物
function Food(snake){
    let row ,col

    do{
        row = Math.floor(Math.random()*(trs))
        col = Math.floor(Math.random()*(tds))
    }while(
        snake.some(element => row ===element.row && col ===element.col)
    )

    document.querySelector("table").rows[row].cells[col].style.backgroundColor = 'pink'
    document.querySelector("table").rows[row].cells[col].style.borderRadius = '50%'
    this.food = {row,col}
}