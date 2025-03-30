import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

function ScoreBoard() {
  return (
    <Box className="rca-container rca-margin">
      <Box className="rca-row">
        <Box className="rca-column-6">
          <Box className="rca-medium-widget rca-padding rca-live-season rca-top-border">
            <Text className="rca-live-label rca-right">IND vs NZL</Text>
            <Box className="rca-clear"></Box>
            <Box className="rca-padding">
              <Heading as="h3" className="rca-match-title">
                <a href="/main.html">IND: 173/2 in 18.5</a>
              </Heading>
            </Box>
          </Box>

          <Box className="rca-mini-widget rca-history-info">
            <Box className="rca-row">
              <Text className="rca-col rca-history-title">Match:</Text>
              <Text className="rca-col">
                {' '}
                Team X vs Team Y - 6th Qualifying Match
              </Text>
            </Box>

            <Box className="rca-row">
              <Text className="rca-col rca-history-title">Series:</Text>
              <Text className="rca-col"> Developer season 2014</Text>
            </Box>

            <Box className="rca-row">
              <Text className="rca-col rca-history-title">Date (GMT):</Text>
              <Text className="rca-col"> 24th Sep 2014 00:00 GMT</Text>
            </Box>

            <Box className="rca-row">
              <Text className="rca-col rca-history-title">Venue:</Text>
              <Text className="rca-col"> India</Text>
            </Box>

            <Box className="rca-row">
              <Text className="rca-col rca-history-title">Match Type:</Text>
              <Text className="rca-col"> Twenty20 Cricket Match</Text>
            </Box>

            <Box className="rca-row">
              <Text className="rca-col rca-history-title">Toss:</Text>
              <Text className="rca-col">
                {' '}
                Team X won the toss and chose to bat first
              </Text>
            </Box>
          </Box>
        </Box>

        <Box className="rca-column-6">
          <Box className="rca-medium-widget rca-top-border">
            <Tabs isFitted variant="enclosed">
              <TabList>
                <Tab>Team1</Tab>
                <Tab>Team2</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Box className="rca-batting-score rca-padding">
                    <Heading as="h3">
                      Team X Batting: <strong> 92/2 in 8.5</strong>
                    </Heading>

                    <Box className="rca-row">
                      <Box className="rca-header rca-table">
                        <Box className="rca-col rca-player">Batsmen</Box>
                        <Box className="rca-col">R</Box>
                        <Box className="rca-col">4s</Box>
                        <Box className="rca-col">6s</Box>
                        <Box className="rca-col">SR</Box>
                      </Box>
                    </Box>

                    <Box className="rca-row">
                      <Box className="rca-table">
                        <Box className="rca-col rca-player">Player x1*</Box>
                        <Box className="rca-col">8 (7)</Box>
                        <Box className="rca-col">0</Box>
                        <Box className="rca-col">1</Box>
                        <Box className="rca-col">114.29</Box>
                      </Box>
                    </Box>

                    <Box className="rca-row">
                      <Box className="rca-table">
                        <Box className="rca-col rca-player">Player x2</Box>
                        <Box className="rca-col">8 (7)</Box>
                        <Box className="rca-col">0</Box>
                        <Box className="rca-col">1</Box>
                        <Box className="rca-col">114.29</Box>
                      </Box>
                    </Box>

                    <Box className="rca-clear"></Box>
                  </Box>

                  <Box className="rca-bowling-score rca-padding">
                    <Heading as="h3">Team X Bowling:</Heading>

                    <Box className="rca-row">
                      <Box className="rca-header rca-table">
                        <Box className="rca-col rca-player">Bowler</Box>
                        <Box className="rca-col small">O</Box>
                        <Box className="rca-col small">M</Box>
                        <Box className="rca-col small">R</Box>
                        <Box className="rca-col small">W</Box>
                        <Box className="rca-col small">Econ</Box>
                        <Box className="rca-col small">Extras</Box>
                      </Box>
                    </Box>

                    <Box className="rca-row">
                      <Box className="rca-table">
                        <Box className="rca-col rca-player">Player Y</Box>
                        <Box className="rca-col small">6</Box>
                        <Box className="rca-col small">2</Box>
                        <Box className="rca-col small">38</Box>
                        <Box className="rca-col small">2</Box>
                        <Box className="rca-col small">7.00</Box>
                        <Box className="rca-col small">3</Box>
                      </Box>
                    </Box>

                    <Box className="rca-row">
                      <Box className="rca-table">
                        <Box className="rca-col rca-player">Player Y</Box>
                        <Box className="rca-col small">6</Box>
                        <Box className="rca-col small">2</Box>
                        <Box className="rca-col small">38</Box>
                        <Box className="rca-col small">2</Box>
                        <Box className="rca-col small">7.00</Box>
                        <Box className="rca-col small">3</Box>
                      </Box>
                    </Box>

                    <Box className="rca-clear"></Box>
                  </Box>
                </TabPanel>
                <TabPanel></TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ScoreBoard;
