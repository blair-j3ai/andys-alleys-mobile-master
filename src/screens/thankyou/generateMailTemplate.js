export function generateMailTemplate(gameHistory) {
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getDate() +
    "/" +
    (current_datetime.getMonth() + 1) +
    "/" +
    current_datetime.getFullYear();
  return `
	<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Email template</title>
    <style>
      /* -------------------------------------
				GLOBAL RESETS
				------------------------------------- */
      /*All the styling goes here*/
      img {
        border: none;
        -ms-interpolation-mode: bicubic;
        max-width: 100%;
      }

      .text-center {
        text-align: center;
      }

      .m-auto {
        margin: auto;
      }

      body {
        background-color: #f6f6f6;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      table {
        border-collapse: separate;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        width: 100%;
      }

      table td {
        font-family: sans-serif;
        font-size: 14px;
        vertical-align: top;
      }

      /* -------------------------------------
				BODY & CONTAINER
				------------------------------------- */
      .body {
        background-color: #f6f6f6;
        width: 100%;
      }

      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
      .container {
        display: block;
        margin: 0 auto !important;
        /* makes it centered */
        /* max-width: 580px; */
        padding: 10px;
        /* width: 580px; */
        box-sizing: border-box;
      }

      /* This should also be a block element, so that it will fill 100% of the .container */
      .content {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        /* max-width: 580px; */
        max-width: 842px;
        padding: 10px;
      }

      /* -------------------------------------
				HEADER, FOOTER, MAIN
				------------------------------------- */
      .main {
        background: #ffffff;
        border-radius: 3px;
        width: 100%;
      }

      .wrapper {
        box-sizing: border-box;
        padding: 20px;
        border-top: 5px solid #89d9d1;
        border-bottom: 5px solid #89d9d1;
      }

      .content-block {
        padding-bottom: 10px;
        padding-top: 10px;
      }

      .footer {
        clear: both;
        margin-top: 10px;
        text-align: center;
        width: 100%;
      }

      .footer td,
      .footer p,
      .footer span,
      .footer a {
        color: #999999;
        font-size: 12px;
        text-align: center;
      }

      /* -------------------------------------
				TYPOGRAPHY
				------------------------------------- */
      h1,
      h2,
      h3,
      h4 {
        color: #000000;
        font-family: sans-serif;
        font-weight: 400;
        line-height: 1.4;
        margin: 0;
        margin-bottom: 30px;
      }

      h1 {
        font-size: 35px;
        font-weight: 300;
        text-align: center;
        text-transform: capitalize;
      }

      p,
      ul,
      ol {
        font-family: sans-serif;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
        margin-bottom: 15px;
      }

      p li,
      ul li,
      ol li {
        list-style-position: inside;
        margin-left: 5px;
      }

      a {
        color: #3498db;
        text-decoration: underline;
      }

      /* -------------------------------------
				BUTTONS
				------------------------------------- */
      .btn {
        box-sizing: border-box;
        width: 100%;
      }

      .btn > tbody > tr > td {
        padding-bottom: 15px;
      }

      .btn table {
        width: auto;
      }

      .btn table td {
        background-color: #ffffff;
        border-radius: 5px;
        text-align: center;
      }

      .btn a {
        background-color: #ffffff;
        border: solid 1px #ac7a3a;
        border-radius: 5px;
        box-sizing: border-box;
        color: #ac7a3a;
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
        padding: 6px 15px;
        text-decoration: none;
        text-transform: capitalize;
      }

      .btn-primary table td {
        background-color: #ac7a3a;
      }

      .btn-primary a {
        background-color: #ac7a3a;
        border-color: #ac7a3a;
        color: #ffffff;
      }

      /* -------------------------------------
				OTHER STYLES THAT MIGHT BE USEFUL
				------------------------------------- */
      .last {
        margin-bottom: 0;
      }

      .first {
        margin-top: 0;
      }

      .align-center {
        text-align: center;
      }

      .align-right {
        text-align: right;
      }

      .align-left {
        text-align: left;
      }

      .clear {
        clear: both;
      }

      .mt0 {
        margin-top: 0;
      }

      .mb0 {
        margin-bottom: 0;
      }

      .preheader {
        color: transparent;
        display: none;
        height: 0;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        mso-hide: all;
        visibility: hidden;
        width: 0;
      }

      .powered-by a {
        text-decoration: none;
      }

      hr {
        border: 0;
        border-bottom: 1px solid #f6f6f6;
        margin: 20px 0;
      }

      /* -------------------------------------
				SCOREBOARD TABLE STYLES
				------------------------------------- */
      .table {
        height: auto !important;
      }

      .scoreboard {
        height: 20px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        display: flex;
        flex-direction: column;
      }

      .scoreboard-content-container {
        display: flex;
        flex-direction: row;
        padding: 7px 8px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background-color: #eff0ec;
        justify-content: space-between;
      }

      .scoreboard .player-name {
        background-color: #ac7a3a;
        padding: 0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        color: #ffffff;
        height: 41px;
        width: 100%;
        position: relative;
      }

      .scoreboard .player-name span {
        padding-left: 10px;
        padding-top: 10px;
        padding-right: 10px;
        display: inline-block;
        font-size: 18px;
      }

      .scoreboard .scoreboard-content {
        display: flex;
        flex-direction: column;
        /*width: 60px; */
        margin-right: 5px;
      }

      .scoreboard .scoreboard-content:last-child {
        margin: 0;
      }

      .strike-score {
        display: flex;
        flex-direction: row;
      }

      .scoreboard .frame {
        display: flex;
        flex-direction: row;
      }

      .strike-score-data {
        width: 16px;
        height: 16px;
        margin-right: 5px;
        font-size: 12px;
        padding-top: 2px;
        background-color: #ffffff;
        border: 1px solid #d5d3d3;
      }

      .strike-score-data:last-child {
        margin-right: 0;
      }

      .strike-score-data:first-child {
        margin-left: 0;
      }

      .strike-total {
        display: flex;
        flex-direction: row;
        height: 25px;
        background-color: #ffffff;
        margin: 5px 0px;
        border: 1px solid #d5d3d3;
      }

      .strike-frame {
        display: flex;
        flex-direction: row;
        height: 20px;
        background-color: #ffffff;
        border: 1px solid #d5d3d3;
      }

      /* -------------------------------------
				RESPONSIVE AND MOBILE FRIENDLY STYLES
				------------------------------------- */
      @media only screen and (max-width: 620px) {
        table[class="body"] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important;
        }

        table[class="body"] p,
        table[class="body"] ul,
        table[class="body"] ol,
        table[class="body"] td,
        table[class="body"] span,
        table[class="body"] a {
          font-size: 16px !important;
        }

        table[class="body"] .wrapper,
        table[class="body"] .article {
          padding: 10px !important;
        }

        table[class="body"] .content {
          padding: 0 !important;
        }

        table[class="body"] .container {
          padding: 0 !important;
          width: 100% !important;
        }

        table[class="body"] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }

        table[class="body"] .btn table {
          width: 100% !important;
        }

        table[class="body"] .btn a {
          width: 100% !important;
        }

        table[class="body"] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important;
        }
      }

      /* -------------------------------------
				PRESERVE THESE STYLES IN THE HEAD
				------------------------------------- */
      @media all {
        .ExternalClass {
          width: 100%;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }

        .apple-link a {
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          text-decoration: none !important;
        }

        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          line-height: inherit;
        }

        .btn-primary table td:hover {
          background-color: #34495e !important;
        }

        .btn-primary a:hover {
          background-color: #34495e !important;
          border-color: #34495e !important;
        }
        .mb-20 {
          margin-bottom: 20px;
				}
				.mb-10 {
          margin-bottom: 10px;
				}

      }
      .fullHeight {
        height: 100vh;
      }
      .fullHeight-last {
        height: 80vh;
      }
      .mt-50vh {
        margin-top: 25vh;
      }

      .brand-page {
        border-top: 7px solid #ac7a3a;
        border-bottom: 7px solid #ac7a3a;
        border-radius: 0;
    }

    .brand-page strong {
        font-size: 2rem;
    }

    .brand-page p {
        font-size: 1rem;
    }

    .brand-page-end {
        border-top: 7px solid #ac7a3a;
        border-bottom: 7px solid #ac7a3a;
        border-radius: 0;
    }

    .brand-page-end strong {
        font-size: 2rem;
    }

    .brand-page-end p {
        font-size: 1rem;
    }
    </style>
  </head>

  <body>

<!-- loop game starts here-->
		${gameHistory
      .map(
        (game, index) => `

    <div class="main contain content fullHeight">
      <div class="game1">
        <h1>Game ${index + 1}</h1>
				<!-- Score board table -->
				${game
          .map(
            player => `
            <div class="table scoreboard mb-10">
          <div class="player-name">
            <span>${player.name}</span>
            <span style="float:right;">Total Score: ${player.totalScore}</span>
          </div>
          <!-- player-name -->
          <div class="scoreboard-content-container">
					${player.scoreHistory
            .map(
              (item, ind) => `
					<!-- scoreboard cotent loop starts here -->
						<div class="scoreboard-content">
						<div class="strike-score">
              <!-- loop ball score starts here -->

							<span class="strike-score-data text-center">${
                item[0].score === 15 ? "x" : item[0].score || ""
              }</span>

							<span class="strike-score-data text-center">${
                item[0].score === 15 && ind + 1 !== 10
                  ? ""
                  : item[0].score + item[1].score === 15 && item[1].score !== 0
                  ? "/"
                  : item[1].score || ""
              }</span>


							<span class="strike-score-data text-center">${
                item[2].score !== undefined &&
                (item[0].score === 15 || item[0].score + item[1].score === 15)
                  ? item[0].score + item[1].score + item[2].score
                  : item[2].score || ""
              }</span>
							<!-- loop ball score ends here -->
						</div>
						<!-- .strike-score ends here -->
						<div class="strike-total">
							<span class="m-auto">${item.frameScore || ""}</span>
						</div>
						<!-- .strike-total ends here -->
						<div class="strike-frame">
							<span class="m-auto">${ind + 1}</span>
						</div>
						<!-- .strike-frame ends here -->
					</div>
					<!-- .scoreboard-content ends here-->
						`
            )
            .toString()
            .replace(/,/g, "")}

            <!-- scoreboard cotent loop ends here -->
          </div>
				</div>
				`
          )
          .toString()
          .replace(/,/g, "")}

        <!-- .table scoreboard ends here -->
      </div>
      <!-- Game 1 ends here -->
		</div>
		`
      )
      .toString()
      .replace(/,/g, "")}

		<!-- Ends here main contain content fullHeight -->
    <!-- game loop ends here-->
    <div class="content text-center main fullHeight-last brand-page-end">
        <div class="m-auto" style="margin-top: 40vh; font-size: 24px;">
            <img src="https://trello-attachments.s3.amazonaws.com/5cf41e3567af11823ba0b142/5dcb6e274f441d7023a58138/86020ba7c0542450b173d92cffdec166/image.png"
                alt="brand logo here" srcset="" width="80%" class="brand-logo" />
            <p style="margin-top: 20px">Thank you for choosing Andy's Alleys.!</p>
            <p>
                <strong>
                  Andy's Alleys 5 Pin Bowling Centre
                </strong>
            </p>
        </div>
    </div>
  </body>
</html>
	`;
}
