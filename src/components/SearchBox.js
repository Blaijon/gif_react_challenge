import React from "react";
import { connect } from "react-redux";
import { Col, Row, Button, Image } from "react-bootstrap";
import { removeFavortieGif } from "../actions/gif";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "react-loader-advanced";

const FavoriteGif = ({
  favoriteGif,
  removeFavortieGif,
  removedFavoriteGif,
  loader_favorite,
  handleImageLoadedFavorite
}) => {
  return (
    <Col sm={5}>
      <Row>
        <Col sm={9} className="text-left">
          <h4 className="mt-5 mb-5">YOUR LIKED GIFS</h4>
        </Col>
      </Row>
      <Row>
        {favoriteGif && favoriteGif.length > 0 ? (
          favoriteGif.map((data, index) => (
            <Loader
              key={index}
              show={loader_favorite}
              message={"loading"}
              foregroundStyle={{ color: "white" }}
              backgroundStyle={{ backgroundColor: "black" }}
            >
              <Col className="text-center" key={index} sm={6}>
                <p className="text-right">
                  <Button
                    className="rounded-circle"
                    size="md"
                    variant="outline-danger"
                    onClick={() => {
                      removeFavortieGif(index);
                      removedFavoriteGif();
                    }}
                  >
                    <span>&times;</span>
                  </Button>
                </p>
                <h4>{data.username}</h4>
                <Image
                  className="mb-3"
                  src={data.images.fixed_height.url}
                  thumbnail
                  onLoad={handleImageLoadedFavorite}
                />
              </Col>
            </Loader>
          ))
        ) : (
          <Col className="mb-4 py-5 bg-dark text-white text-center" sm={11}>
            <h4>No Favorite Gif Found</h4>
          </Col>
        )}

        {
          <Col className="text-center" sm={12}>
            <Link
              style={{
                pointerEvents: favoriteGif.length !== 4 ? "none" : "unset"
              }}
              to="/results"
              className={
                favoriteGif.length === 4
                  ? "mb-4 btn btn-primary"
                  : "mb-4 btn btn-primary disabled"
              }
            >
              <span>CALCULATE MY WIERDNESS SCORE</span>
            </Link>
          </Col>
        }

        {favoriteGif.length !== 4 ? (
          <Col className="text-center" sm={12}>
            <p>
              {" "}
              You Must Like{" "}
              <span className="font-weight-bold">
                {4 - favoriteGif.length}
              </span>{" "}
              more GIF to calculate your score
            </p>
          </Col>
        ) : null}
      </Row>
    </Col>
  );
};
FavoriteGif.propTypes = {
  removeFavortieGif: PropTypes.func.isRequired,
  favoriteGif: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  favoriteGif: state.gif_reducer
});

export default connect(
  mapStateToProps,
  { removeFavortieGif }
)(FavoriteGif);
