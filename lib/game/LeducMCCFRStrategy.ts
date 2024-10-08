type Action = string;
export type Strategy = { [key in Action]: number };
type HistoryMap = { [key: string]: Strategy };
type Hand = string | [string, string];
type PlayerStrategy = { [key: string]: HistoryMap };

function parseStrategy(strategyStr: string): Strategy {
  const strategyObj: Strategy = {};
  const pairs = strategyStr.slice(1, -1).split(", ");
  for (const pair of pairs) {
    const [action, prob] = pair.split(": ");
    strategyObj[action.replace(/'/g, "") as Action] = parseFloat(prob);
  }
  return strategyObj;
}

function parseHand(handStr: string): Hand {
  handStr = handStr.trim();
  if (handStr.startsWith("(") && handStr.endsWith(")")) {
    const cards = handStr
      .slice(1, -1)
      .split(",")
      .map((card) => card.trim().replace(/'/g, ""));
    return cards as [string, string];
  }
  return handStr;
}

function handToString(hand: Hand): string {
  if (typeof hand === "string") {
    return hand;
  }
  return hand.join(",");
}

function parseComputedStrategy(data: string): [PlayerStrategy, PlayerStrategy] {
  const lines = data.split("\n");

  const player1Strategy: PlayerStrategy = {};
  const player2Strategy: PlayerStrategy = {};
  let currentStrategy: PlayerStrategy | null = null;

  for (const line of lines) {
    if (line.startsWith("Player 1 Strategy:")) {
      currentStrategy = player1Strategy;
    } else if (line.startsWith("Player 2 Strategy:")) {
      currentStrategy = player2Strategy;
    } else if (line.startsWith("History/hand:") && currentStrategy) {
      const [historyPart, strategyPart] = line.split(", Strategy: ");
      let [history, handStr] = historyPart.split(": ")[1].split(/\s+(.+)/);

      const hand = parseHand(handStr);
      const handKey = handToString(hand);

      const strategy = parseStrategy(strategyPart);

      if (!currentStrategy[handKey]) {
        currentStrategy[handKey] = {};
      }
      currentStrategy[handKey][history.trim()] = strategy;
    }
  }

  return [player1Strategy, player2Strategy];
}

// Usage
// Assume computedStrategyData is a string containing the content of your computedStrategy.txt file
const computedStrategyData = `
Player 1 Strategy:
History/hand:  Q, Strategy: {'x': 0.59, 'r': 0.41}
History/hand: xr Q, Strategy: {'c': 0.46, 'f': 0.39, 'r': 0.15}
History/hand: xrc| ('Q', 'Q'), Strategy: {'x': 0.33, 'r': 0.67}
History/hand: xrc|xr ('Q', 'Q'), Strategy: {'c': 0.0, 'f': 0.0, 'r': 1.0}
History/hand: xrrc| ('J', 'Q'), Strategy: {'x': 0.59, 'r': 0.41}
History/hand: xrrc|xr ('J', 'Q'), Strategy: {'c': 0.01, 'f': 0.8, 'r': 0.19}
History/hand:  J, Strategy: {'x': 0.87, 'r': 0.13}
History/hand: xx| ('J', 'Q'), Strategy: {'x': 0.95, 'r': 0.05}
History/hand: xx|xr ('J', 'Q'), Strategy: {'c': 0.0, 'f': 0.97, 'r': 0.03}
History/hand: xr J, Strategy: {'c': 0.19, 'f': 0.74, 'r': 0.07}
History/hand: xrc| ('J', 'K'), Strategy: {'x': 0.87, 'r': 0.13}
History/hand: xrc|xr ('J', 'K'), Strategy: {'c': 0.41, 'f': 0.52, 'r': 0.08}
History/hand: rc| ('J', 'K'), Strategy: {'x': 0.31, 'r': 0.69}
History/hand: rc|rr ('J', 'K'), Strategy: {'c': 0.61, 'f': 0.39}
History/hand: rr J, Strategy: {'c': 0.88, 'f': 0.12}
History/hand:  K, Strategy: {'x': 0.39, 'r': 0.61}
History/hand: xx| ('K', 'K'), Strategy: {'x': 0.18, 'r': 0.82}
History/hand: xx|xr ('K', 'K'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
History/hand: xx|rr ('K', 'K'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: rc| ('K', 'Q'), Strategy: {'x': 0.6, 'r': 0.4}
History/hand: rc| ('K', 'K'), Strategy: {'x': 0.06, 'r': 0.94}
History/hand: rc|rr ('K', 'K'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: rr K, Strategy: {'c': 0.98, 'f': 0.02}
History/hand: xrc| ('K', 'Q'), Strategy: {'x': 0.88, 'r': 0.12}
History/hand: xrc|rr ('K', 'Q'), Strategy: {'c': 0.48, 'f': 0.52}
History/hand: xx|rr ('J', 'Q'), Strategy: {'c': 0.02, 'f': 0.98}
History/hand: rr Q, Strategy: {'c': 0.9, 'f': 0.1}
History/hand: rrc| ('J', 'Q'), Strategy: {'x': 0.69, 'r': 0.31}
History/hand: rc|xr ('J', 'K'), Strategy: {'c': 0.38, 'f': 0.31, 'r': 0.31}
History/hand: rrc| ('J', 'K'), Strategy: {'x': 0.72, 'r': 0.28}
History/hand: rrc|rr ('J', 'K'), Strategy: {'c': 0.78, 'f': 0.22}
History/hand: rc| ('J', 'Q'), Strategy: {'x': 0.83, 'r': 0.17}
History/hand: rc|xr ('J', 'Q'), Strategy: {'c': 0.01, 'f': 0.94, 'r': 0.05}
History/hand: rrc| ('Q', 'Q'), Strategy: {'x': 0.3, 'r': 0.7}
History/hand: rrc|xr ('Q', 'Q'), Strategy: {'c': 0.0, 'f': 0.0, 'r': 1.0}
History/hand: rc|rr ('K', 'Q'), Strategy: {'c': 0.69, 'f': 0.31}
History/hand: rrc|rr ('J', 'Q'), Strategy: {'c': 0.07, 'f': 0.93}
History/hand: xx| ('Q', 'Q'), Strategy: {'x': 0.62, 'r': 0.38}
History/hand: rrc| ('K', 'Q'), Strategy: {'x': 0.73, 'r': 0.27}
History/hand: xr K, Strategy: {'c': 0.13, 'f': 0.02, 'r': 0.86}
History/hand: xrc| ('K', 'K'), Strategy: {'x': 0.53, 'r': 0.47}
History/hand: xrc|xr ('K', 'K'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
History/hand: xrc| ('J', 'Q'), Strategy: {'x': 0.84, 'r': 0.16}
History/hand: xrc|xr ('J', 'Q'), Strategy: {'c': 0.0, 'f': 0.91, 'r': 0.09}
History/hand: rc| ('Q', 'Q'), Strategy: {'x': 0.54, 'r': 0.46}
History/hand: rc|rr ('Q', 'Q'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xx| ('J', 'K'), Strategy: {'x': 0.91, 'r': 0.09}
History/hand: xrrc| ('K', 'Q'), Strategy: {'x': 0.85, 'r': 0.15}
History/hand: xrrc|xr ('K', 'Q'), Strategy: {'c': 0.62, 'f': 0.3, 'r': 0.08}
History/hand: xrrc|rr ('K', 'Q'), Strategy: {'c': 0.53, 'f': 0.47}
History/hand: rc|rr ('J', 'Q'), Strategy: {'c': 0.05, 'f': 0.95}
History/hand: xx| ('K', 'Q'), Strategy: {'x': 0.93, 'r': 0.07}
History/hand: xx|rr ('K', 'Q'), Strategy: {'c': 0.42, 'f': 0.58}
History/hand: xrc|xr ('K', 'Q'), Strategy: {'c': 0.58, 'f': 0.33, 'r': 0.09}
History/hand: rrc|xr ('K', 'Q'), Strategy: {'c': 0.57, 'f': 0.32, 'r': 0.11}
History/hand: rrc|rr ('K', 'Q'), Strategy: {'c': 0.35, 'f': 0.65}
History/hand: xx|xr ('J', 'K'), Strategy: {'c': 0.03, 'f': 0.93, 'r': 0.03}
History/hand: rc| ('J', 'J'), Strategy: {'x': 0.67, 'r': 0.33}
History/hand: rc|rr ('J', 'J'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xx|rr ('J', 'K'), Strategy: {'c': 0.09, 'f': 0.91}
History/hand: xrc|rr ('K', 'K'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: rc|xr ('K', 'Q'), Strategy: {'c': 0.55, 'f': 0.37, 'r': 0.07}
History/hand: xx|xr ('K', 'Q'), Strategy: {'c': 0.29, 'f': 0.63, 'r': 0.08}
History/hand: xrrc| ('J', 'K'), Strategy: {'x': 0.77, 'r': 0.23}
History/hand: xrrc|rr ('J', 'K'), Strategy: {'c': 0.83, 'f': 0.17}
History/hand: rrc| ('J', 'J'), Strategy: {'x': 0.29, 'r': 0.71}
History/hand: rc|xr ('Q', 'Q'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
History/hand: xx| ('J', 'J'), Strategy: {'x': 0.71, 'r': 0.29}
History/hand: xx|xr ('J', 'J'), Strategy: {'c': 0.13, 'f': 0.0, 'r': 0.88}
History/hand: xx|rr ('J', 'J'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xrc|rr ('J', 'K'), Strategy: {'c': 0.38, 'f': 0.62}
History/hand: xrrc|rr ('J', 'Q'), Strategy: {'c': 0.08, 'f': 0.92}
History/hand: rrc|xr ('J', 'K'), Strategy: {'c': 0.66, 'f': 0.25, 'r': 0.09}
History/hand: xrrc|xr ('J', 'K'), Strategy: {'c': 0.62, 'f': 0.26, 'r': 0.11}
History/hand: xrrc| ('J', 'J'), Strategy: {'x': 0.11, 'r': 0.89}
History/hand: xrc|rr ('Q', 'Q'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xrrc| ('Q', 'Q'), Strategy: {'x': 0.31, 'r': 0.69}
History/hand: xrrc|xr ('Q', 'Q'), Strategy: {'c': 0.0, 'f': 0.0, 'r': 1.0}
History/hand: xrc|rr ('J', 'Q'), Strategy: {'c': 0.07, 'f': 0.93}
History/hand: xrrc|rr ('Q', 'Q'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xx|rr ('Q', 'Q'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xrc| ('J', 'J'), Strategy: {'x': 0.52, 'r': 0.48}
History/hand: xrc|xr ('J', 'J'), Strategy: {'c': 0.0, 'f': 0.0, 'r': 1.0}
History/hand: xrc|rr ('J', 'J'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xrrc|rr ('J', 'J'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: rrc|xr ('J', 'Q'), Strategy: {'c': 0.01, 'f': 0.89, 'r': 0.1}
History/hand: xx|xr ('Q', 'Q'), Strategy: {'c': 0.0, 'f': 0.0, 'r': 1.0}
History/hand: rrc|rr ('J', 'J'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xrrc|xr ('J', 'J'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
History/hand: xrrc| ('K', 'K'), Strategy: {'x': 0.25, 'r': 0.75}
History/hand: xrrc|rr ('K', 'K'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: rrc| ('K', 'K'), Strategy: {'x': 0.24, 'r': 0.76}
History/hand: rrc|rr ('Q', 'Q'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: rc|xr ('K', 'K'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
History/hand: xrrc|xr ('K', 'K'), Strategy: {'c': 0.0, 'f': 0.0, 'r': 1.0}
History/hand: rrc|xr ('J', 'J'), Strategy: {'c': 0.0, 'f': 0.0, 'r': 1.0}
History/hand: rrc|xr ('K', 'K'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
History/hand: rrc|rr ('K', 'K'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: rc|xr ('J', 'J'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}

Player 2 Strategy:
History/hand: x K, Strategy: {'x': 0.12, 'r': 0.88}
History/hand: xrc|x ('K', 'Q'), Strategy: {'x': 0.67, 'r': 0.33}
History/hand: xrc|xrr ('K', 'Q'), Strategy: {'c': 0.81, 'f': 0.19}
History/hand: xrc|r ('K', 'Q'), Strategy: {'c': 0.41, 'f': 0.47, 'r': 0.12}
History/hand: xrr K, Strategy: {'c': 0.97, 'f': 0.03}
History/hand: xrrc|x ('J', 'K'), Strategy: {'x': 0.74, 'r': 0.26}
History/hand: xrrc|xrr ('J', 'K'), Strategy: {'c': 0.67, 'f': 0.33}
History/hand: xrrc|r ('J', 'K'), Strategy: {'c': 0.6, 'f': 0.26, 'r': 0.14}
History/hand: r K, Strategy: {'c': 0.1, 'f': 0.02, 'r': 0.88}
History/hand: x Q, Strategy: {'x': 0.49, 'r': 0.51}
History/hand: xx|x ('Q', 'Q'), Strategy: {'x': 0.0, 'r': 1.0}
History/hand: xx|x ('J', 'K'), Strategy: {'x': 0.91, 'r': 0.09}
History/hand: xx|xrr ('J', 'K'), Strategy: {'c': 0.05, 'f': 0.95}
History/hand: xx|r ('J', 'K'), Strategy: {'c': 0.03, 'f': 0.92, 'r': 0.05}
History/hand: r Q, Strategy: {'c': 0.53, 'f': 0.11, 'r': 0.36}
History/hand: rc|r ('K', 'Q'), Strategy: {'c': 0.31, 'f': 0.55, 'r': 0.14}
History/hand: x J, Strategy: {'x': 0.79, 'r': 0.21}
History/hand: r J, Strategy: {'c': 0.37, 'f': 0.51, 'r': 0.11}
History/hand: rc|x ('J', 'Q'), Strategy: {'x': 0.75, 'r': 0.25}
History/hand: rc|r ('J', 'Q'), Strategy: {'c': 0.0, 'f': 0.88, 'r': 0.12}
History/hand: xrc|x ('K', 'K'), Strategy: {'x': 0.01, 'r': 0.99}
History/hand: xrc|r ('K', 'K'), Strategy: {'c': 0.02, 'f': 0.0, 'r': 0.98}
History/hand: rrc|x ('J', 'K'), Strategy: {'x': 0.57, 'r': 0.43}
History/hand: rrc|r ('J', 'K'), Strategy: {'c': 0.58, 'f': 0.17, 'r': 0.25}
History/hand: rc|x ('K', 'K'), Strategy: {'x': 0.01, 'r': 0.99}
History/hand: rc|xrr ('K', 'K'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: rrc|r ('K', 'K'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
History/hand: xx|x ('J', 'Q'), Strategy: {'x': 0.88, 'r': 0.12}
History/hand: xx|xrr ('J', 'Q'), Strategy: {'c': 0.02, 'f': 0.98}
History/hand: xx|r ('J', 'Q'), Strategy: {'c': 0.0, 'f': 0.95, 'r': 0.05}
History/hand: rc|x ('J', 'K'), Strategy: {'x': 0.83, 'r': 0.17}
History/hand: rc|xrr ('J', 'K'), Strategy: {'c': 0.67, 'f': 0.33}
History/hand: rc|r ('J', 'K'), Strategy: {'c': 0.42, 'f': 0.44, 'r': 0.15}
History/hand: xrc|x ('J', 'K'), Strategy: {'x': 0.53, 'r': 0.47}
History/hand: xrc|r ('J', 'K'), Strategy: {'c': 0.4, 'f': 0.27, 'r': 0.33}
History/hand: xrr J, Strategy: {'c': 0.83, 'f': 0.17}
History/hand: xrrc|x ('J', 'J'), Strategy: {'x': 0.02, 'r': 0.98}
History/hand: xrrc|xrr ('J', 'J'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xrrc|r ('J', 'J'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
History/hand: rrc|x ('J', 'Q'), Strategy: {'x': 0.46, 'r': 0.54}
History/hand: rrc|xrr ('J', 'Q'), Strategy: {'c': 0.11, 'f': 0.89}
History/hand: rrc|r ('J', 'Q'), Strategy: {'c': 0.01, 'f': 0.64, 'r': 0.35}
History/hand: rrc|r ('J', 'J'), Strategy: {'c': 0.0, 'f': 0.0, 'r': 1.0}
History/hand: xx|x ('K', 'Q'), Strategy: {'x': 0.93, 'r': 0.07}
History/hand: xx|r ('K', 'Q'), Strategy: {'c': 0.17, 'f': 0.76, 'r': 0.07}
History/hand: rrc|x ('K', 'K'), Strategy: {'x': 0.02, 'r': 0.98}
History/hand: rc|r ('J', 'J'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
History/hand: xrc|xrr ('J', 'K'), Strategy: {'c': 0.71, 'f': 0.29}
History/hand: rc|x ('J', 'J'), Strategy: {'x': 0.0, 'r': 1.0}
History/hand: rrc|xrr ('K', 'K'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xrc|x ('J', 'Q'), Strategy: {'x': 0.52, 'r': 0.48}
History/hand: xrc|xrr ('J', 'Q'), Strategy: {'c': 0.15, 'f': 0.85}
History/hand: rrc|x ('K', 'Q'), Strategy: {'x': 0.58, 'r': 0.42}
History/hand: rrc|xrr ('K', 'Q'), Strategy: {'c': 0.69, 'f': 0.31}
History/hand: rrc|r ('K', 'Q'), Strategy: {'c': 0.52, 'f': 0.34, 'r': 0.13}
History/hand: xx|x ('J', 'J'), Strategy: {'x': 0.0, 'r': 1.0}
History/hand: rc|xrr ('J', 'Q'), Strategy: {'c': 0.05, 'f': 0.95}
History/hand: xrc|r ('J', 'Q'), Strategy: {'c': 0.02, 'f': 0.81, 'r': 0.17}
History/hand: xrr Q, Strategy: {'c': 0.86, 'f': 0.14}
History/hand: xrrc|r ('J', 'Q'), Strategy: {'c': 0.01, 'f': 0.71, 'r': 0.28}
History/hand: xrrc|r ('K', 'Q'), Strategy: {'c': 0.52, 'f': 0.28, 'r': 0.2}
History/hand: rrc|xrr ('J', 'K'), Strategy: {'c': 0.77, 'f': 0.23}
History/hand: xx|xrr ('J', 'J'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xx|r ('J', 'J'), Strategy: {'c': 0.15, 'f': 0.0, 'r': 0.85}
History/hand: xrrc|x ('K', 'Q'), Strategy: {'x': 0.52, 'r': 0.48}
History/hand: xrrc|xrr ('K', 'Q'), Strategy: {'c': 0.72, 'f': 0.28}
History/hand: rc|x ('K', 'Q'), Strategy: {'x': 0.85, 'r': 0.15}
History/hand: rc|xrr ('K', 'Q'), Strategy: {'c': 0.33, 'f': 0.67}
History/hand: rc|x ('Q', 'Q'), Strategy: {'x': 0.0, 'r': 1.0}
History/hand: rc|xrr ('Q', 'Q'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: rc|r ('Q', 'Q'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
History/hand: rc|r ('K', 'K'), Strategy: {'c': 0.0, 'f': 0.0, 'r': 1.0}
History/hand: xrrc|x ('K', 'K'), Strategy: {'x': 0.05, 'r': 0.95}
History/hand: xrrc|xrr ('K', 'K'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xrrc|r ('K', 'K'), Strategy: {'c': 0.09, 'f': 0.0, 'r': 0.91}
History/hand: xrrc|x ('J', 'Q'), Strategy: {'x': 0.66, 'r': 0.34}
History/hand: xrc|xrr ('K', 'K'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xrrc|x ('Q', 'Q'), Strategy: {'x': 0.01, 'r': 0.99}
History/hand: xrrc|r ('Q', 'Q'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
History/hand: xrc|x ('J', 'J'), Strategy: {'x': 0.04, 'r': 0.96}
History/hand: xrc|r ('J', 'J'), Strategy: {'c': 0.21, 'f': 0.0, 'r': 0.79}
History/hand: xrrc|xrr ('J', 'Q'), Strategy: {'c': 0.18, 'f': 0.82}
History/hand: xrc|x ('Q', 'Q'), Strategy: {'x': 0.02, 'r': 0.98}
History/hand: xrc|xrr ('Q', 'Q'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xrc|r ('Q', 'Q'), Strategy: {'c': 0.5, 'f': 0.0, 'r': 0.5}
History/hand: xx|xrr ('K', 'Q'), Strategy: {'c': 0.29, 'f': 0.71}
History/hand: xrrc|xrr ('Q', 'Q'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: rc|xrr ('J', 'J'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: rrc|x ('Q', 'Q'), Strategy: {'x': 0.01, 'r': 0.99}
History/hand: rrc|xrr ('Q', 'Q'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xx|x ('K', 'K'), Strategy: {'x': 0.0, 'r': 1.0}
History/hand: xx|xrr ('K', 'K'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: rrc|x ('J', 'J'), Strategy: {'x': 0.01, 'r': 0.99}
History/hand: rrc|xrr ('J', 'J'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xrc|xrr ('J', 'J'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xx|xrr ('Q', 'Q'), Strategy: {'c': 1.0, 'f': 0.0}
History/hand: xx|r ('Q', 'Q'), Strategy: {'c': 0.0, 'f': 0.0, 'r': 1.0}
History/hand: rrc|r ('Q', 'Q'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
History/hand: xx|r ('K', 'K'), Strategy: {'c': 0.01, 'f': 0.0, 'r': 0.99}
`;

export const [player1Strategy, player2Strategy] =
  parseComputedStrategy(computedStrategyData);
