import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Container, Row, Button, Image, Modal } from "react-bootstrap";
import SearchBox from "./SearchBox";
import FavoriteGif from "./FavoriteGif";
import Slider from "react-rangeslider";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setFavortieGif, startOver } from "../actions/gif";
import PropTypes from "prop-types";
import Loader from "react-loader-advanced";

class GifRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range_value: 1,
      gifySearchData: null,
      gifySearchDatafiltered: null,
      searchValue: "",
      liked_disbled: false,
      show: false,
      searchTermUssed: false,
      imageStatus: "loading",
      loader_favorite: false
    };
  }

  handleChange = value => {
    this.setState({
      loader: true
    });
    const rangeSliderGif = this.state.gifySearchData.data
      .filter((data, index) => {
        return index === value - 1;
      })
      .map((data, index) => ({
        ...data,
        searchTerm: this.state.searchValue,
        weirdnessLevel: this.state.range_value,
        authenticated: true
      }));
    this.setState({
      range_value: value,
      gifySearchDatafiltered: rangeSliderGif
    });
  };
  // handleChange = event => {
  //   // console.log("event.target.value", event.target.value);
  //   // console.log("this.state.gifySearchData", this.state.gifySearchData.data);
  //   if (this.state.gifySearchData !== null) {
  //     const rangeSliderGif = this.state.gifySearchData.data
  //       .filter((data, index) => {
  //         console.log("val", event.target.value);
  //         return index == event.target.value - 1;
  //       })
  //       .map((data, index) => ({
  //         ...data,
  //         searchTerm: this.state.searchValue,
  //         weirdnessLevel: this.state.range_value
  //       }));
  //     console.log("rangeSliderGif", rangeSliderGif);

  //     this.setState({
  //       range_value: event.target.value,
  //       gifySearchDatafiltered: rangeSliderGif
  //     });
  //     console.log(
  //       "this.state.gifySearchDatafiltered.data",
  //       this.state.gifySearchDatafiltered
  //     );
  //   }
  // };

  handleSearchChange = e => {
    const searchTermUsed =
      this.props.favoriteGif &&
      this.props.favoriteGif.some((data, index) => {
        return data.searchTerm == e.target.value;
      });
    if (this.props.favoriteGif.length === 0) {
      this.setState(
        {
          searchValue: e.target.value,
          loader: true,
          searchTermUssed: false
        },
        () => {
          // console.log(this.state.searchValue);
          this.fetchGif(this.state.searchValue);
        }
      );
    } else if (searchTermUsed) {
      this.setState(
        {
          searchValue: e.target.value,
          liked_disbled: true,
          searchTermUssed: true
        },
        () => {
          // console.log(this.state.searchValue);
          this.fetchGif(this.state.searchValue);
        }
      );
    } else {
      this.setState(
        {
          searchValue: e.target.value,
          liked_disbled: false,
          searchTermUssed: false,
          loader: true
        },
        () => {
          // console.log(this.state.searchValue);
          this.fetchGif(this.state.searchValue);
        }
      );
    }
  };

  fetchGif(searchvalue) {
    fetch(
      `http://api.giphy.com/v1/gifs/search?q=${searchvalue}&api_key=B1oKuK2KSxoN2D4Cnv1n3oNZtw23UOYD&limit=10`
    )
      .then(res => res.json())
      .then(data => {
        const gifySearchDatafiltered =
          data.data.length > 0 &&
          data.data
            .filter((data, index) => {
              return index === this.state.range_value - 1;
            })
            .map((data, index) => ({
              ...data,
              searchTerm: this.state.searchValue,
              weirdnessLevel: this.state.range_value,
              authenticated: true
            }));

        this.setState({
          gifySearchDatafiltered,
          gifySearchData: data,
          loader: true
        });
        console.log(
          "this.state.gifySearchDatafiltered)",
          this.state.gifySearchDatafiltered
        );
        console.log("this.state.gifySearchData", this.state.gifySearchData);
      });
  }
  removedFavoriteGif = () => {
    this.setState({
      liked_disbled: false,
      searchTermUssed: false
    });
  };

  // favoriteGif() {
  //   this.setState(() => {
  //     favoriteGif;
  //   });
  // }
  handleClose = () => {
    this.setState({
      show: false,
      searchTermUssed: false,
      gifySearchDatafiltered: null
    });
  };

  addFavoriteGif = () => {
    if (this.props.favoriteGif.length < 5) {
      this.props.setFavortieGif(...this.state.gifySearchDatafiltered);
      this.setState({
        // liked_disbled: true,
        loader_favorite: true,
        show: true,
        searchValue: "",
        searchTermUssed: true
      });
    } else {
      console.log("cant add more");
    }
  };

  handleImageLoaded = () => {
    this.setState({
      imageStatus: "loaded",
      loader: false
    });
  };

  handleImageLoadedFavorite = () => {
    this.setState({
      loader_favorite: false
    });
  };

  render() {
    const {
      range_value,
      gifySearchDatafiltered,
      liked_disbled,
      loader,
      loader_favorite,
      show,
      searchValue,
      searchTermUssed
    } = this.state;
    console.log("loader", loader);
    return (
      <Container fluid={true}>
        <Row>
          <Col className="bg-light" sm={12}>
            <h2 className="py-5 px-3">Wierdness Calculator</h2>
          </Col>
        </Row>
        <Row>
          <Col sm={7}>
            <p className="mt-5">
              Find out how weird you are by selecting the GIFs that make you
              laugh. We'll show you the least weird ones to start, but you can
              move the slider to make them weirder.
            </p>
            <p className="mb-5">
              When you find a GIF you like, press the LIKE button. Once you like
              5 GIF's, we'll show you how weird you are.
            </p>
            <label>Search Form</label>
            <SearchBox
              searchValue={searchValue}
              handleSearchChange={this.handleSearchChange}
            />

            {gifySearchDatafiltered &&
            gifySearchDatafiltered.length > 0 &&
            searchTermUssed === false &&
            this.props.favoriteGif.length !== 5 ? (
              gifySearchDatafiltered.map((searchGifdata, index) => (
                <Loader
                  key={index}
                  show={loader}
                  message={"loading"}
                  foregroundStyle={{ color: "white" }}
                  backgroundStyle={{ backgroundColor: "black" }}
                >
                  <Row>
                    <Col sm={12}>
                      <h2>Your Result</h2>
                      <Row className="align-self-center mb-4">
                        <Col className="text-center">
                          <Image
                            className="mb-3"
                            src={searchGifdata.images.fixed_height_small.url}
                            thumbnail
                            onLoad={this.handleImageLoaded}
                          />
                          <Row>
                            <Col className="text-center">
                              <Button
                                size="lg"
                                variant="outline-primary"
                                onClick={this.addFavoriteGif}
                                disabled={searchTermUssed}
                              >
                                <FontAwesomeIcon icon={faThumbsUp} />
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12}>
                          {/* <input
                          type="range"
                          min="1"
                          max="10"
                          value={range_value}
                          onChange={this.handleChange}
                        /> */}
                          <Slider
                            max={10}
                            min={1}
                            value={range_value}
                            onChange={this.handleChange}
                          />
                          <p>Weirdness Score: {range_value}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Loader>
              ))
            ) : (
              <Col className="py-5 bg-dark text-white text-center" sm={10}>
                <h4>
                  {this.props.favoriteGif.length === 5 &&
                    "MAX FAVORITE GIF SELECTED"}
                  {searchTermUssed === true &&
                    this.props.favoriteGif.length !== 5 &&
                    "GIF FOR SEARCH TERM ALREADY SELECTED"}
                  {this.props.favoriteGif.length !== 5 &&
                    searchTermUssed === false &&
                    "NO GIF FOUND"}
                </h4>
              </Col>
            )}
          </Col>
          <FavoriteGif
            handleImageLoadedFavorite={this.handleImageLoadedFavorite}
            loader_favorite={loader_favorite}
            removedFavoriteGif={this.removedFavoriteGif}
          />
        </Row>
        <Modal backdrop="static" show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Congrats!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, lets find a new search tem</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
GifRoot.propTypes = {
  setFavortieGif: PropTypes.func.isRequired,
  favoriteGif: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  favoriteGif: state.gif_reducer
});

export default connect(
  mapStateToProps,
  { setFavortieGif, startOver }
)(GifRoot);
