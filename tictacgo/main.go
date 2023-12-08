package main

import (
	"fmt"
	"io"
	"log"

	"github.com/charmbracelet/bubbles/list"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	zone "github.com/lrstanley/bubblezone"
)

type item string

func (i item) FilterValue() string { return "" }

type itemDelegate struct{}

func (d itemDelegate) Height() int                             { return 1 }
func (d itemDelegate) Spacing() int                            { return 0 }
func (d itemDelegate) Update(_ tea.Msg, _ *list.Model) tea.Cmd { return nil }
func (d itemDelegate) Render(w io.Writer, m list.Model, index int, listItem list.Item) {
	i, ok := listItem.(item)
	if !ok {
		return
	}
	str := fmt.Sprintf("%s", i)
	fn := lipgloss.NewStyle().PaddingLeft(3).Render
	fmt.Fprint(w, fn(str))
}

func main() {
	zone.NewGlobal()
	// p := tea.NewProgram(model{}, tea.WithAltScreen(), tea.WithMouseAllMotion())
	// if _, err := p.Run(); err != nil {
	// 	log.Fatal(err)
	// }

	msgs := list.New([]list.Item{item("Game started")}, itemDelegate{}, 400, 10)
	msgs.Styles.Title = lipgloss.NewStyle().Background(lipgloss.Color("689")).Bold(true).Padding(0, 1)
	msgs.SetFilteringEnabled(false)
	msgs.SetShowStatusBar(false)
	msgs.SetShowHelp(false)

	msgs.Title = "Messages"

	p := tea.NewProgram(gameModel{
		board:    newBoard(),
		messages: msgs,
		choices:  []string{"Reset board", "Save score", "Play with a friend"},
		wins:     make(map[string]int),
		player:   "X"}, tea.WithAltScreen(), tea.WithMouseAllMotion())

	m, err := p.Run()

	if err != nil {
		log.Fatal(err)

	}

	// Assert the final tea.Model to our local model and print the choice.
	if m, ok := m.(gameModel); ok && m.winner != "" {
		fmt.Printf("\n%s has won the match!\n", m.winner)
	}

}
