package main

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/charmbracelet/bubbles/list"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	zone "github.com/lrstanley/bubblezone"
)

type gameModel struct {
	board      Board
	selected   string
	hovered    string
	player     string
	winner     string
	choices    []string // items on the to-do list
	messages   list.Model
	cursor     int // which to-do list item our cursor is pointing at
	wins       map[string]int
	mouseEvent tea.MouseEvent
}

var (
	modelStyle = lipgloss.NewStyle().
			Width(11).
			Height(5).
			Align(lipgloss.Center, lipgloss.Center).Padding(0).Margin(0)
	hoveredStyle = lipgloss.NewStyle().
			Width(11).
			Height(5).Padding(0).Margin(0).
			Align(lipgloss.Center, lipgloss.Center).BorderForeground(lipgloss.Color("689"))
)

func (m gameModel) Init() tea.Cmd {
	return tea.Batch(tea.EnterAltScreen)
}

func (m gameModel) inboundID(msg tea.MouseMsg) (res string, e error) {
	selected := ""
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			id := fmt.Sprintf("%v%v", i, j)
			if zone.Get(id).InBounds(msg) {
				selected = id
			}
		}
	}
	if selected != "" {
		return selected, nil
	}
	return selected, errors.New("No space selected")
}

func addMsg(m *gameModel, msg string) tea.Cmd {
	return m.messages.InsertItem(0, item(msg))
}

func (m gameModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var cmds []tea.Cmd
	switch msg := msg.(type) {
	case tea.KeyMsg:

		switch msg.String() {
		case "ctrl+c", "q":
			return m, tea.Quit
		case "up", "k":
			if m.cursor > 0 {
				m.cursor--
			}
		case "down", "j":
			if m.cursor < len(m.choices)-1 {
				m.cursor++
			}
		case "enter", " ":
			selected := m.choices[m.cursor]
			switch selected {
			case "Reset board":
				cmds = append(cmds, addMsg(&m, "Board reset"))
				m.board = newBoard()
			case "Save score":
				cmds = append(cmds, addMsg(&m, "Save"))
			}

		}
	case tea.WindowSizeMsg:
		// h, v := lipgloss.NewStyle().Margin(1, 2).GetFrameSize()
		m.messages.SetSize(100, 15)
	case tea.MouseMsg:
		if msg.Type == tea.MouseMotion {
			id, e := m.inboundID(msg)
			if e == nil {
				m.hovered = id
			} else {
				m.hovered = ""
			}
		}
		if msg.Type == tea.MouseLeft {
			id, e := m.inboundID(msg)
			if e == nil {
				selected := string([]rune(id))
				i, _ := strconv.Atoi(fmt.Sprintf("%c", selected[0]))
				j, _ := strconv.Atoi(fmt.Sprintf("%c", selected[1]))

				if m.board.state[i][j] == " " {
					m.board.state[i][j] = m.player
				}

				won, _ := m.board.hasWon(m.player)
				if won {
					m.winner = m.player
					if _, ok := m.wins[m.winner]; ok {
						m.wins[m.winner] += 1
					} else {
						m.wins[m.winner] = 1
					}
					cmds = append(cmds, addMsg(&m, fmt.Sprintf("%v has won the round!", m.winner)))
					m.board = newBoard()

					m.player = "X"
				} else {
					if m.player == "O" {
						m.player = "X"
					} else {
						m.player = "O"
					}
				}
			}
		}
		if msg.Type != tea.MouseLeft {
			return m, nil
		}
	}

	newListModel, cmd := m.messages.Update(msg)
	m.messages = newListModel
	cmds = append(cmds, cmd)

	return m, tea.Batch(cmds...)
}

func (m gameModel) View() string {
	s := ""

	sections := make([]string, 3)
	for i := range sections {
		zones := make([]string, 3)
		for j := range zones {
			cell := m.board.state[i][j]
			id := fmt.Sprintf("%v%v", i, j)
			if id == m.hovered {
				zones[j] = zone.Mark(id, hoveredStyle.Border(lipgloss.NormalBorder(), true).Render(fmt.Sprintf(cell)))
			} else {
				zones[j] = zone.Mark(id, modelStyle.Border(lipgloss.NormalBorder(), true).Render(fmt.Sprintf(cell)))
			}
		}
		sections[i] = lipgloss.JoinHorizontal(0, zones...)
	}

	wins := ""
	// Sums the wins for each player
	for k, v := range m.wins {
		wins += fmt.Sprintf("\n%v: %v\n", k, v)
	}
	wins = lipgloss.NewStyle().BorderLeft(true).BorderForeground(lipgloss.Color("689")).MarginLeft(5).Render(wins)

	// Joins the board, menu, and score
	s += lipgloss.JoinHorizontal(0, lipgloss.JoinVertical(0, sections[:]...), lipgloss.JoinVertical(0, m.renderMenu(), wins))

	// Add the message component to the bottom
	s = lipgloss.JoinVertical(0, s, lipgloss.NewStyle().PaddingTop(2).Render(m.messages.View()))

	return zone.Scan(lipgloss.NewStyle().PaddingLeft(5).PaddingTop(2).Render(s))
}

func (m gameModel) renderMenu() string {
	// The header
	s := fmt.Sprintf("\nGame Menu\n\n")

	// Iterate over our choices
	for i, choice := range m.choices {

		// Is the cursor pointing at this choice?
		cursor := " " // no cursor
		if m.cursor == i {
			cursor = ">" // cursor!
		}
		// Render the row
		s += fmt.Sprintf("%s %s\n", cursor, choice)
	}

	// The footer
	s += "\nPress q to quit.\n"

	// Send the UI for rendering
	return lipgloss.NewStyle().MarginLeft(5).Render(s)
}
