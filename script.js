class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: "",
      author: "",
      color: ""
    };
  }
  componentWillMount() {
    this.newQuote();
  }

  newQuote = async () => {
    let quotes = null;
    const data = await fetch(
      `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`
    );
    if (data.ok) {
      quotes = await data.json();
    }
    const index = Math.round(Math.random() * quotes.quotes.length);
    const colors = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857"
    ];
    const color = colors[Math.round(Math.random() * colors.length)];
    this.setState({
      quote: quotes.quotes[index].quote,
      author: quotes.quotes[index].author.replace("–", ""),
      color
    });

    const body = document.querySelector("body");
    body.style.backgroundColor = color;
    console.log(body);
  };
  render() {
    return (
      <div id="quote-box">
        <blockquote className={"quote__text"}>
          <p style={{ color: this.state.color }} id="text">
            <i class="fa fa-quote-left"> </i>
            {this.state.quote ? this.state.quote : "Loading"}
          </p>
        </blockquote>
        <div className={"quote__author"}>
          <span id="author" style={{ color: this.state.color }}>
            {this.state.author ? `-${this.state.author}` : "Loading"}
          </span>
        </div>
        <div className={"quote__buttons"}>
          <a
            href={`https://twitter.com/intent/tweet?text=%22${this.state.quote}%22%0A%0A%2D${this.state.author}`}
            id={"tweet-quote"}
            target={"_blank"}
            className={"button"}
            style={{ backgroundColor: this.state.color }}
          >
            Tweet Quote
          </a>
          <button
            type={"button"}
            id={"new-quote"}
            onClick={() => this.newQuote()}
            className={"button"}
            style={{ backgroundColor: this.state.color }}
          >
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
