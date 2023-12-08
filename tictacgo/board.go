package main

type Board struct {
	state [3][3]string
}

func newBoard() Board {
	empty := " "
	defaultState := [3][3]string{
		{empty, empty, empty},
		{empty, empty, empty},
		{empty, empty, empty},
	}

	board := Board{
		state: defaultState,
	}

	return board
}

func (b Board) hasWon(player string) (bool, []int) {
	conditions := [][9]int{
		{1, 1, 1, 0, 0, 0, 0, 0, 0},
		{0, 0, 0, 1, 1, 1, 0, 0, 0},
		{0, 0, 0, 0, 0, 0, 1, 1, 1},
		{1, 0, 0, 1, 0, 0, 1, 0, 0},
		{0, 1, 0, 0, 1, 0, 0, 1, 0},
		{0, 0, 1, 0, 0, 1, 0, 0, 1},
		{0, 0, 1, 0, 1, 0, 1, 0, 0},
		{1, 0, 0, 0, 1, 0, 0, 0, 1}}

	var flatBoard [9]int
	count := 0
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			cell := b.state[i][j]
			if cell == player {
				flatBoard[count] = 1
			}
			count += 1
		}
	}

	for _, condition := range conditions {
		count := 0
		for idx, item := range condition {
			if item == 1 && flatBoard[idx] == 1 {
				count += 1
			}
		}
		if count >= 3 {
			return true, flatBoard[:]
		}
	}
	return false, flatBoard[:]
}

// [1,1,1,0,0,0,0,0,0]
// [0,0,0,1,1,1,0,0,0]
// [0,0,0,0,0,0,1,1,1]

// [1,0,0,1,0,0,1,0,0]
// [0,1,0,0,1,0,0,1,0]
// [0,0,1,0,0,1,0,0,1]

// [0,0,1,0,1,0,1,0,0]
// [1,0,0,0,1,0,0,0,1]
