'use babel';

import GitLog2 from '../lib/git-log2';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('GitLog2', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('git-log2');
  });

  describe('when the git-log2:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.git-log2')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'git-log2:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.git-log2')).toExist();

        let gitLog2Element = workspaceElement.querySelector('.git-log2');
        expect(gitLog2Element).toExist();

        let gitLog2Panel = atom.workspace.panelForItem(gitLog2Element);
        expect(gitLog2Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'git-log2:toggle');
        expect(gitLog2Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.git-log2')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'git-log2:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let gitLog2Element = workspaceElement.querySelector('.git-log2');
        expect(gitLog2Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'git-log2:toggle');
        expect(gitLog2Element).not.toBeVisible();
      });
    });
  });
});
